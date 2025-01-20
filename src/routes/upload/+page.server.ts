import { buildFileTree } from "$lib/files";
import { getAllFiles } from "$lib/server/s3";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, "/login");
  if (locals.user.role !== "ADMIN") redirect(302, "/");

  const files = await getAllFiles();
  return {
    files: buildFileTree("files", files)
  };
};

export const actions: Actions = {
  files: async () => {
    const files = await getAllFiles();
    return {
      files: buildFileTree("files", files)
    };
  }
};
