import type { PageServerLoad } from "./$types";
import { getSneakyCrowAlbum } from "$lib/spotify";

const ERROR_MSG =
  "Zach failed to connect this website to Spotify, blame him for this error and try again later.";
export const load: PageServerLoad = async () => {
  try {
    const albumData = await getSneakyCrowAlbum();
    return {
      albums: albumData
    };
  } catch (e) {
    console.error(`Could not load album page ${e}`);
    return {
      error: {
        message: ERROR_MSG
      }
    };
  }
};
