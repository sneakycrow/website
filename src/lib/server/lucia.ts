import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { github } from "@lucia-auth/oauth/providers";
import { env } from "$env/dynamic/private";
import { createRequire } from "module";

const GITHUB_SCOPES = ["user:email"];

// Temporary fix https://github.com/prisma/prisma/issues/5030#issuecomment-1347116391
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

export const auth = lucia({
  adapter: prisma(client),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      avatar: data.avatar
    };
  }
});

export const githubAuth = github(auth, {
  redirectUri: "https://sneakycrow.dev/auth/callback/github",
  clientId: env.GITHUB_ID ?? "",
  clientSecret: env.GITHUB_SECRET ?? "",
  scope: GITHUB_SCOPES
});

export type Auth = typeof auth;
