import { env } from "$env/dynamic/private";
import type { Account } from "@prisma/client";
import client from "./server/db";
import { getAccountWithUserById } from "./server/user";
import { getFromRedis, saveToRedis } from "./server/redis";

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
  if (json.error?.status === 400) {
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
  const spotifyClientSecret = env.SPOTIFY_SECRET;
  if (!spotifyClientId) {
    throw new Error("Missing Spotify client ID");
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        // @ts-expect-error - Buffer is not defined in the browser
        "Basic " + new Buffer.from(spotifyClientId + ":" + spotifyClientSecret).toString("base64")
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to refresh token, ${res.status}, ${text}`);
  }

  const json = await res.json();
  if (!json.access_token || !json.refresh_token) {
    throw new Error("Failed to refresh token, missing access or refresh token");
  }
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token
  };
};

export const getSneakyCrowAlbum = async (): Promise<AlbumData[]> => {
  // Check if we have the album data cached
  // const cachedAlbumData = await getFromRedis("sneakyCrowAlbum");
  // if (cachedAlbumData) {
  //   return JSON.parse(cachedAlbumData);
  // }
  // If not, fetch it from Spotify
  const SNEAKYCROW_SPOTIFY_USERNAME = "sneakycr0w";
  const sneakyCrowAccount = await getAccountWithUserById(SNEAKYCROW_SPOTIFY_USERNAME);
  if (!sneakyCrowAccount) {
    throw new Error("SneakyCrow account not found");
  }
  const albumData = await getUserAlbumsWithAccount(sneakyCrowAccount);
  // Make sure to cache the album data before returning
  await saveToRedis("sneakyCrowAlbum", JSON.stringify(albumData));
  return albumData;
};
