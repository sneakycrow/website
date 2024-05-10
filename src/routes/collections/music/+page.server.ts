import type { PageServerLoad } from "./$types";
import { getSneakyCrowTopArtists } from "$lib/spotify";

export const load: PageServerLoad = async () => {
  const artistData = await getSneakyCrowTopArtists();
  return {
    artists: artistData
  };
};
