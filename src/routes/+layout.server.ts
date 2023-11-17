import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  try {
    const session = await locals.auth.validate();
    if (!session) return;
    return {
      username: session.user.username,
      avatar: session.user.avatar
    };
  } catch (error) {
    console.error(`Error authorizing user ${error}`);
  }
};
