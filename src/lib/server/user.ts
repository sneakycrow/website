import { Prisma } from "@prisma/client";
import prisma from "@prisma/client";
import client from "$lib/server/db";
import { nanoid } from "nanoid";

type User = prisma.User;
type Account = prisma.Account;

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

export const getAllUsers = async (): Promise<User[] | null> => {
  return client.user.findMany();
};

export const getUserAccountProviderByUserId = async (
  provider: string,
  userId: string
): Promise<Account | null> => {
  return client.account.findFirst({
    where: {
      provider,
      userId
    }
  });
};

export const getUserAccountProviderByUserName = async (
  provider: string,
  username: string
): Promise<Account | null> => {
  return client.account.findFirst({
    where: {
      provider,
      user: {
        username
      }
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

const accountsWithUser = Prisma.validator<Prisma.AccountDefaultArgs>()({
  include: {
    user: true
  }
});

type AccountsWithUser = Prisma.AccountGetPayload<typeof accountsWithUser>;

export const getAccountWithUserById = async (id: string): Promise<AccountsWithUser | null> => {
  return client.account.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
};

type NewUser = {
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  username: string;
  email: string;
  avatar: string;
};

export const createUserFromProvider = async (provider: string, user: NewUser): Promise<User> => {
  return client.user.create({
    data: {
      id: nanoid(10),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      accounts: {
        create: [
          {
            id: user.providerId,
            provider: provider,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
          }
        ]
      }
    }
  });
};

type NewAccount = {
  provider: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  userId: string;
};

export const connectAccountToUser = async (account: NewAccount) => {
  return client.account.create({
    data: {
      id: account.providerId,
      provider: account.provider,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      userId: account.userId
    }
  });
};
