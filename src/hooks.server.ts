import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: "https://0e272c5b37f4fc8bedc85ee8716183f1@o4506240903806976.ingest.sentry.io/4506240904003584",
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: import.meta.env.MODE ?? "development"
});

export const handleError = Sentry.handleErrorWithSentry();

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    // sveltekit types deviates from the de-facto standard
    // you can use 'as any' too
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};
