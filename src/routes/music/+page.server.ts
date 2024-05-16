import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Temporarily redirect to top artists page
  throw redirect(302, "/music/top-artists");
};
