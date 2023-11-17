import { sequence } from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

Sentry.init({
  dsn: "https://0e272c5b37f4fc8bedc85ee8716183f1@o4506240903806976.ingest.sentry.io/4506240904003584",
  tracesSampleRate: 1
});

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  return resolve(event);
});
export const handleError = Sentry.handleErrorWithSentry();
