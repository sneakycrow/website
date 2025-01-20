import { getAllUsers } from "$lib/server/user";
import prisma from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getAllowedPanels } from "$lib/settings";

type User = prisma.User;

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, "/login");
  // Process the allowed panels based on the role of the user
  const allowedPanels = getAllowedPanels(locals.user.role);
  let users: User[] = []; // Initialized empty in case we don't need the data
  // If the user is allowed to access the users panel, fetch the users
  if (allowedPanels.includes("users")) {
    users = (await getAllUsers()) ?? [];
  }
  return {
    users,
    allowedPanels
  };
};
