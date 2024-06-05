import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Temporarily redirect to photos page
  throw redirect(302, "/art/photos");
};
