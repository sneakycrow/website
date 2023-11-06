// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      auth: import("lucia").AuthRequest;
    }
  }
}

/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;

    type DatabaseUserAttributes = {
      avatar: string;
      username: string;
    };
    type DatabaseSessionAttributes = Record<string, never>;
  }
}

interface ImportMetaEnv {
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  AUTH_SECRET: string;
}

export {};
