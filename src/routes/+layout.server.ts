import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
  const session = await locals.auth.validate();
  const pageMeta = {
    title: {
      text: "Sneaky Crow",
      link: "/"
    }
  };
  if (route.id?.startsWith("/blog")) {
    pageMeta.title.text = "Brain Juice";
    pageMeta.title.link = "/blog";
  }
  if (!session) return pageMeta;
  return {
    username: session.user.username,
    avatar: session.user.avatar,
    ...pageMeta
  };
};
