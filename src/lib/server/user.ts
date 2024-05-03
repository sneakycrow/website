import { Prisma, type User } from "@prisma/client";
import { client } from "$lib/server/db";
import { nanoid } from "nanoid";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return client.user.findUnique({
    where: {
      username
    }
  });
};

const userWithAccounts = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    accounts: true
  }
});

type UserWithAccounts = Prisma.UserGetPayload<typeof userWithAccounts>;

export const getUserWithAccountsById = async (id: string): Promise<UserWithAccounts | null> => {
  return client.user.findUnique({
    where: {
      id
    },
    include: {
      accounts: true
    }
  });
};

export const getUserByProviderId = async (id: string): Promise<User | null> => {
  const account = await client.account.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });

  return account ? account.user : null;
};

type GitHubUserRequirements = {
  providerId: string;
  accessToken: string;
  username: string;
  email: string;
  avatar: string;
};

export const createUserWithGitHub = async (githubUser: GitHubUserRequirements): Promise<User> => {
  return client.user.create({
    data: {
      id: nanoid(10),
      username: githubUser.username,
      email: githubUser.email,
      avatar: githubUser.avatar,
      accounts: {
        create: [
          {
            id: githubUser.providerId,
            provider: "github",
            accessToken: githubUser.accessToken
          }
        ]
      }
    }
  });
};
