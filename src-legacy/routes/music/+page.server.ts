import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Temporarily redirect to art music page until we finished the published music page
  redirect(302, "/art/music");
};
