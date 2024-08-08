import { env } from "$env/dynamic/private";
import type { Account } from "@prisma/client";
import client from "./db";
import { getAccountWithUserById } from "./user";

export const scopes = [
  "user-read-email",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played"
];
const SNEAKYCROW_SPOTIFY_USERNAME = "sneakycr0w";

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
  if (!spotifyClientId || !spotifyClientSecret) {
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

  const json = await res.json();

  if (!res.ok) {
    const { status, message } = json.error;
    throw new Error(`Failed to refresh token, ${status}, ${message}`);
  }

  if (!json.access_token) {
    throw new Error(`Failed to refresh token, no access token found in response`);
  }

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token ?? refreshToken // Return the old refresh token if not updated
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

type TopItemsOptions = {
  type: "artists" | "tracks";
  limit: number;
  time_range: "short_term" | "medium_term" | "long_term";
};

const defaultTopItemsOptions: TopItemsOptions = {
  type: "artists",
  limit: 10,
  time_range: "short_term"
};

type TopArtistData = {
  error?: {
    message: string;
  };
  name: string;
  external_urls: {
    spotify: string;
  };
  images: [
    {
      url: string;
      width: number;
      height: number;
    },
    {
      url: string;
      width: number;
      height: number;
    }
  ];
};

export const getTopArtistsWithAccount = async (
  account: Account,
  options: TopItemsOptions = defaultTopItemsOptions
): Promise<TopArtistData[]> => {
  const url = new URL(`https://api.spotify.com/v1/me/top/artists`);
  url.searchParams.append("time_range", options.time_range);
  url.searchParams.append("limit", options.limit.toString());

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${account.accessToken}`
    }
  });

  const json = await res.json();

  if (!res.ok) {
    const { status, message } = json.error;
    if (status === 401) {
      // Token expired, need to refresh
      if (!account.refreshToken) {
        throw new Error("Access Token expired, but no refresh token found");
      }
      const newTokens = await refreshToken(account.refreshToken);
      // Successfully got new tokens, update account in database
      await client.account.update({
        where: {
          id: account.id
        },
        data: {
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken
        }
      });
      // Retry the request with the new tokens
      return getTopArtistsWithAccount(
        {
          ...account,
          accessToken: newTokens.accessToken
        },
        options
      );
    }
    throw new Error(`Failed to get top items, ${status} ${message}`);
  }

  return json.items;
};

export const getSneakyCrowTopArtists = async (): Promise<TopArtistData[]> => {
  const sneakyCrowAccount = await getAccountWithUserById(SNEAKYCROW_SPOTIFY_USERNAME);
  if (!sneakyCrowAccount) {
    throw new Error("SneakyCrow account not found");
  }
  const items = await getTopArtistsWithAccount(sneakyCrowAccount, {
    type: "artists",
    limit: 9, // 3 x 3 grid
    time_range: "short_term"
  });

  return items;
};

type TrackData = {
  track: {
    name: string;
    external_urls: {
      spotify: string;
    };
    album: {
      images: [
        {
          url: string;
          width: number;
          height: number;
        }
      ];
      name: string;
      release_date: string;
      external_urls: {
        spotify: string;
      };
      artists: [
        {
          name: string;
          external_urls: {
            spotify: string;
          };
        }
      ];
    };
  };
  played_at: string;
};

// Using the Get Recently Played Tracks API https://developer.spotify.com/documentation/web-api/reference/get-recently-played
export const getRecentTracksWithAccount = async (account: Account): Promise<TrackData[]> => {
  const ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";
  const limit = 50;
  // Get todays date and subtract 1 day, then convert to an Unix timestamp
  const url = new URL(ENDPOINT);
  url.searchParams.append("limit", limit.toString());

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${account.accessToken}`
    }
  });

  const json = await res.json();
  const items = json.items as TrackData[];
  if (!items) {
    // Check if its an access token error, and attempt to refresh the token
    if (json.error?.status === 401) {
      if (!account.refreshToken) {
        throw new Error("Access Token expired, but no refresh token found");
      }
      const newTokens = await refreshToken(account.refreshToken);
      // Successfully got new tokens, update account in database
      await client.account.update({
        where: {
          id: account.id
        },
        data: {
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken
        }
      });
      // Retry the request with the new tokens
      return getRecentTracksWithAccount({
        ...account,
        accessToken: newTokens.accessToken
      });
    }
    throw new Error("Failed to get recent tracks, no items found in response");
  }
  // Organize the tracks by date listened
  items.sort((a, b) => (a.played_at > b.played_at ? -1 : 1));
  return items;
};

// Wrapper function to get the recent tracks for the SneakyCrow account specifically
export const getSneakyCrowRecentTracks = async (): Promise<TrackData[]> => {
  try {
    const sneakyCrowAccount = await getAccountWithUserById(SNEAKYCROW_SPOTIFY_USERNAME);
    if (!sneakyCrowAccount) {
      throw new Error("SneakyCrow account not found");
    }
    return getRecentTracksWithAccount(sneakyCrowAccount);
  } catch (error) {
    console.error(`Failed to get recent tracks for SneakyCrow: ${error}`);
    return [];
  }
};
