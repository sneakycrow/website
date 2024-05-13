import { getUserWithAccountsById } from "$lib/server/user";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  const userWithAccounts = await getUserWithAccountsById(locals.user.id);
  if (!userWithAccounts) throw redirect(302, "/login");
  return {
    username: locals.user.username,
    avatar: locals.user.avatar,
    accounts: userWithAccounts.accounts
  };
};
