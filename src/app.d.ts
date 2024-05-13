declare global {
  namespace App {
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
  }
}

interface ImportMetaEnv {
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  AUTH_SECRET: string;
}

export {};
