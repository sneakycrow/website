import type { User } from "@prisma/client";
import { prismaClient } from "$lib/server/db";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return prismaClient.user.findUnique({
    where: {
      username
    }
  });
};
