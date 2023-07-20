import type { PageServerLoad } from "./$types";
import { getMastodonStatus } from "$lib/motd";

export const load = (async ({ params }) => {
  const statuses = await getMastodonStatus();
  const latestStatus = statuses[2];
  console.log(latestStatus.url);
  return {
    motd: {
      content: latestStatus.content,
      url: latestStatus.url,
      image:
        latestStatus.media_attachments.find(
          (img: { type: string; url: string }) => img.type === "image"
        )?.url ?? undefined
    }
  };
}) satisfies PageServerLoad;
