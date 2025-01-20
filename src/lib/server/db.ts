import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@prisma/client";

export const client = new prisma.PrismaClient();

export const adapter = new PrismaAdapter(client.session, client.user);

export default client;
