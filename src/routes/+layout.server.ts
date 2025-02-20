import { keywords } from "$lib";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
  const pageMeta = {
    title: {
      text: "Sneaky Crow",
      link: "/"
    },
    isLive: false,
    description:
      "Sneaky Crow, aka Zachary Corvidae, is a software engineer and artist. This website serves as a hub for his published work and experiments",
    keywords
  };
  if (route.id?.startsWith("/blog")) {
    pageMeta.title.text = "Brain Juice";
    pageMeta.title.link = "/blog";
    pageMeta.description =
      "Where thoughts go to party and occasionally make sense. Enter at your own risk of enlightenment or confusion.";
  }

  if (route.id?.startsWith("/music")) {
    pageMeta.title.text = "Bad Taste";
    pageMeta.title.link = "/music";
    pageMeta.description =
      "Where musical boundaries are shattered, eardrums are challenged, and your neighbors secretly plan their revenge.";
  }

  if (route.id?.startsWith("/games")) {
    pageMeta.title.text = "Escape Now";
    pageMeta.title.link = "/games";
    pageMeta.description =
      "A collection of digital adventures, virtual worlds, and the countless hours spent 'just one more turn'-ing.";
  }

  if (route.id?.startsWith("/art/photos")) {
    pageMeta.title.text = "Writing Light";
    pageMeta.title.link = "/art/photos";
    pageMeta.description =
      "Capturing moments, freezing time, and occasionally taking accidental selfies with the lens cap on.";
  }

  if (!locals.user) return pageMeta;
  return {
    username: locals.user.username,
    avatar: locals.user.avatar,
    role: locals.user.role,
    ...pageMeta
  };
};
