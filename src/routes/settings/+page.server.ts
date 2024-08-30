import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

const DEFAULT_PAGE = "/settings/me";

export const load: PageServerLoad = async () => {
  throw redirect(302, DEFAULT_PAGE);
};
