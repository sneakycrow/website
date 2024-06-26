import type { User } from "@prisma/client";
import client from "$lib/server/db";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return client.user.findUnique({
    where: {
      username
    }
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return client.user.findUnique({
    where: {
      email
    }
  });
};
