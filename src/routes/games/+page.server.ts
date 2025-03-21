import {
  getExpirationByDays,
  getFromCache,
  saveToCache,
  STEAM_OWNED_GAMES
} from "$lib/server/cache";
import { getGamesFromSteam } from "$lib/server/steam";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const cachedGamesData = await getFromCache(STEAM_OWNED_GAMES);
  if (cachedGamesData) {
    return {
      games: JSON.parse(cachedGamesData)
    };
  }
  const gamesData = await getGamesFromSteam("76561198025237160");
  if (gamesData) {
    await saveToCache(STEAM_OWNED_GAMES, JSON.stringify(gamesData), getExpirationByDays(7));
  }

  return {
    games: gamesData
  };
};
