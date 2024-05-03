import { lucia } from "$lib/server/auth";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  logout: async ({ locals }) => {
    if (!locals.session) return fail(401);
    await lucia.invalidateSession(locals.session.id); // invalidate session
    throw redirect(302, "/"); // redirect to login page
  }
};
