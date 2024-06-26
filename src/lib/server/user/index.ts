import { Prisma } from "@prisma/client";
import type { User } from "@prisma/client";
import client from "$lib/server/db";

// A user, including their accounts and feed items
const userWithAccountsAndFeed = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    accounts: true,
    feed: true
  }
});

type UserWithAccountsAndFeed = Prisma.UserGetPayload<typeof userWithAccountsAndFeed>;

// Get a user with their accounts and feed items by their ID
// TODO: Probably optimize feed items to not get _all_ of them
export const getUserWithAccountsAndFeedById = async (
  id: string
): Promise<UserWithAccountsAndFeed | null> => {
  return client.user.findUnique({
    where: {
      id
    },
    include: {
      accounts: true,
      feed: true
    }
  });
};

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
