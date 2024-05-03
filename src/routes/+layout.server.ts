import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route, ...rest }) => {
  const session = await locals.auth.validate();
  let pageTitle = "Sneaky Crow";
  if (route.id?.startsWith("/blog")) {
    pageTitle = "Brain Juice";
  }
  if (!session)
    return {
      pageTitle
    };
  return {
    username: session.user.username,
    avatar: session.user.avatar,
    pageTitle
  };
};
