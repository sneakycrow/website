import { getAllUsers } from "$lib/server/user";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  if (locals.user.role !== "ADMIN") throw redirect(302, "/");
  const users = await getAllUsers();
  return {
    users
  };
};
