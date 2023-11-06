// import { lucia } from "lucia";
// import { sveltekit } from "lucia/middleware";
// import { dev } from "$app/environment";
// import { prisma } from "@lucia-auth/adapter-prisma";
// import { PrismaClient } from "@prisma/client";
// import { github } from "@lucia-auth/oauth/providers";
// import { env } from "$env/dynamic/private";
//
// export const initializedPrismaClient = new PrismaClient();
//
// export const auth = lucia({
//   env: dev ? "DEV" : "PROD",
//   middleware: sveltekit(),
//   adapter: prisma(initializedPrismaClient),
//   getUserAttributes: (data) => {
//     return {
//       username: data.username,
//       avatar: data.avatar
//     };
//   }
// });
//
// const GITHUB_SCOPES = ["user:email"];
//
// export const githubAuth = github(auth, {
//   redirectUri: "http://localhost:5173/auth/callback/github",
//   clientId: env.GITHUB_ID,
//   clientSecret: env.GITHUB_SECRET,
//   scope: GITHUB_SCOPES
// });
//
// export type Auth = typeof auth;
