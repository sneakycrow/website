import { env } from "$env/dynamic/private";
import type { Account } from "@prisma/client";
import client from "./server/db";
import { getAccountWithUserById } from "./server/user";

type AlbumData = {
  album: {
    name: string;
    releaseDate: string;
    artists: {
      name: string;
    }[];
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
};

export const getUserAlbumsWithAccount = async (account: Account): Promise<AlbumData[]> => {
  const res = await fetch("https://api.spotify.com/v1/me/albums", {
    headers: {
      Authorization: `Bearer ${account.accessToken}`
    }
  });
  const json = await res.json();
  const albums: AlbumData[] = json.items;
  if (json.error?.status === 401) {
    console.log("Access Token expired, refreshing");
    // Token expired, need to refresh
    if (!account.refreshToken) {
      console.error("Access Token expired, but no refresh token found");
      return [];
    }
    const newTokens = await refreshToken(account.refreshToken);
    console.log("Successfully refreshed tokens, updating account");
    await client.account.update({
      where: {
        id: account.id
      },
      data: {
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken
      }
    });
    return getUserAlbumsWithAccount({
      id: account.userId,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      provider: account.provider,
      userId: account.userId
    });
  }
  if (json.next) {
    const nextAlbums = await getNextAlbumPage(json.next, account);
    return [...albums, ...nextAlbums];
  }
  return albums;
};

const getNextAlbumPage = async (url: string, account: Account): Promise<AlbumData[]> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${account.accessToken}`
    }
  });
  const json = await res.json();
  const albums = json.items;
  if (json.next) {
    const nextAlbums = await getNextAlbumPage(json.next, account);
    return [...albums, ...nextAlbums];
  }
  return albums;
};

type UpdatedTokens = {
  accessToken: string;
  refreshToken: string;
};

export const refreshToken = async (refreshToken: string): Promise<UpdatedTokens> => {
  const spotifyClientId = env.SPOTIFY_ID;
  if (!spotifyClientId) {
    throw new Error("Missing Spotify client ID");
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: spotifyClientId
    })
  });

  const json = await res.json();
  if (!json.access_token || !json.refresh_token) {
    throw new Error("Failed to refresh token");
  }
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token
  };
};

export const getSneakyCrowAlbum = async (): Promise<AlbumData[]> => {
  const SNEAKYCROW_SPOTIFY_USERNAME = "sneakycr0w";
  const sneakyCrowAccount = await getAccountWithUserById(SNEAKYCROW_SPOTIFY_USERNAME);
  if (!sneakyCrowAccount) {
    throw new Error("SneakyCrow account not found");
  }
  return getUserAlbumsWithAccount(sneakyCrowAccount);
};
