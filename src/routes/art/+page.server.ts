import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Redirect to the music page until I figure out what I want to do on the index page
  throw redirect(302, "/art/music/top-artists");
};
