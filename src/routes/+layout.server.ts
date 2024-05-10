import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
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

  if (route.id?.startsWith("/collections/music")) {
    pageMeta.title.text = "Bad Taste";
    pageMeta.title.link = "/collections/music";
  }

  if (route.id === "/collections") {
    pageMeta.title.text = "Treasure Trash";
    pageMeta.title.link = "/collections";
  }

  if (!locals.user) return pageMeta;
  return {
    username: locals.user.username,
    avatar: locals.user.avatar,
    ...pageMeta
  };
};
