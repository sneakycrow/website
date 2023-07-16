import type { PageServerLoad } from "./$types";
import { getMastodonStatus } from "$lib/motd";

export const load = (async ({ params }) => {
  const statuses = await getMastodonStatus();
  const latestStatus = statuses[0];
  return {
    motd: {
      content: latestStatus.content,
      url: latestStatus.url
    }
  };
}) satisfies PageServerLoad;
