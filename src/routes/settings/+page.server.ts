import { getUserWithAccountsById } from "$lib/server/user";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

const DEFAULT_PAGE = "/settings/me";

export const load: PageServerLoad = async ({ locals }) => {
  throw redirect(302, DEFAULT_PAGE);
};
