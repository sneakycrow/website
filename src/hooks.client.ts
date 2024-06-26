import * as Sentry from "@sentry/sveltekit";
import { handleErrorWithSentry, Replay } from "@sentry/sveltekit";

Sentry.init({
  dsn: "https://0e272c5b37f4fc8bedc85ee8716183f1@o4506240903806976.ingest.sentry.io/4506240904003584",
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // If you don't want to use Session Replay, just remove the line below:
  integrations: [new Replay()],
  environment: import.meta.env.MODE ?? "development"
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
