import {
  getExpirationByDays,
  getFromRedis,
  saveToRedis,
  STEAM_OWNED_GAMES
} from "$lib/server/redis";
import { getGamesFromSteam } from "$lib/server/steam";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const cachedGamesData = await getFromRedis(STEAM_OWNED_GAMES);
  if (cachedGamesData) {
    return {
      games: JSON.parse(cachedGamesData)
    };
  }
  const gamesData = await getGamesFromSteam("76561198025237160");
  if (gamesData) {
    await saveToRedis(STEAM_OWNED_GAMES, JSON.stringify(gamesData), getExpirationByDays(7));
  }

  return {
    games: gamesData
  };
};
