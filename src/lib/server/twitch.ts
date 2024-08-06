import { env } from "$env/dynamic/private";
import { getUserAccountProviderByUserName } from "./user";
import client from "./db";

export const scopes = ["user:read:email"];

type ValidateTokenResponse = {
  user: {
    id: string;
    name: string;
  };
};

// A function that calls the Twitch validation endpoint
// Notably, returns the current user id of the token provided
export const validateToken = async (
  token: string
): Promise<ValidateTokenResponse> => {
  const endpoint = "https://id.twitch.tv/oauth2/validate";
  type ExpectedResponse = {
    user_id: string;
    login: string;
    scopes: string[];
    expires_in: number;
    // client_id: string; // Not used
  };
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const json: ExpectedResponse = await res.json();
  return {
    user: {
      id: json.user_id,
      name: json.login
    }
  };
};

type TwitchUser = {
  avatar: string;
  email: string;
};

// A function for getting a Twitch user by their user ID
export const getUser = async (
  userId: string,
  token: string
): Promise<TwitchUser> => {
  const endpoint = "https://api.twitch.tv/helix/users";
  type ExpectedResponse = {
    data: [
      {
        profile_image_url: string;
        email: string;
      }
    ];
  };
  const res = await fetch(`${endpoint}?id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-ID": env.TWITCH_ID
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user, bad response from Twitch API");
  }
  const json: ExpectedResponse = await res.json();
  const avatar = json.data[0]?.profile_image_url;
  const email = json.data[0]?.email;
  if (!avatar || !email) {
    throw new Error("Failed to fetch user, missing information in response");
  }
  return {
    avatar,
    email
  };
};

type Stream = {
  live: null | string; // null if not live, string of started_at if live
  title: string;
};

// A function for getting stream information by user ID
export const getStream = async (
  userId: string,
  token: string
): Promise<Stream> => {
  const endpoint = "https://api.twitch.tv/helix/streams";
  type ExpectedResponse = {
    data: [
      {
        title: string;
        started_at: string;
        type: string;
      }
    ];
  };
  const res = await fetch(`${endpoint}?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-ID": env.TWITCH_ID
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch stream, bad response from Twitch API", {
      cause: res.status
    });
  }
  const json: ExpectedResponse = await res.json();

  // Fallback to null and empty string if data isn't there. It usually means we're not live anyway.
  const live = json.data[0]?.type === "live" ? json.data[0]?.started_at : null;
  const title = json.data[0]?.title ?? "";
  return {
    live,
    title
  };
};

// A function for getting the stream information of a static user
// This function gets the token information from the database based on the user name
export const getStaticStream = async (): Promise<Stream> => {
  const dbUser = await getUserAccountProviderByUserName("twitch", "sneakycrow");
  if (!dbUser) {
    throw new Error("Failed to find user in database for Twitch");
  }
  if (!dbUser.accessToken) {
    throw new Error("User does not have an access token to Twitch");
  }
  try {
    const res = await getStream(dbUser.id, dbUser.accessToken);
    return res;
  } catch (e) {
    // @ts-ignore
    if (e?.cause === 401) {
      if (!dbUser.refreshToken) {
        throw new Error(
          "Could not refresh token, no refresh token in database"
        );
      }
      const refreshRes = await refreshToken(dbUser.refreshToken);
      // Save the new token to the database
      await client.account.update({
        where: {
          id: dbUser.id
        },
        data: {
          accessToken: refreshRes.access_token,
          refreshToken: refreshRes.refresh_token
        }
      });
      // Try the request again
      // This will throw if it fails again
      try {
        const res = await getStream(dbUser.id, refreshRes.access_token);
        return res;
      } catch (e) {
        throw new Error(
          "Failed to get stream information for static user after refreshing token"
        );
      }
    }
    throw new Error(`Failed to get stream information for static user: ${e}`);
  }
};

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  scopes: string[];
};
// A function for refreshing the token of a user
export const refreshToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  // curl -X POST https://id.twitch.tv/oauth2/token \
  // -H 'Content-Type: application/x-www-form-urlencoded' \
  // -d 'grant_type=refresh_token&refresh_token=gdw3k62zpqi0kw01escg7zgbdhtxi6hm0155tiwcztxc/zkx17&client_id=<your client id goes here>&client_secret=<your client secret goes here>'
  const endpoint = "https://id.twitch.tv/oauth2/token";
  const body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refreshToken);
  body.append("client_id", env.TWITCH_ID);
  body.append("client_secret", env.TWITCH_SECRET);
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  if (!res.ok) {
    throw new Error("Failed to refresh token, bad response from Twitch API");
  }
  return (await res.json()) as RefreshTokenResponse;
};
