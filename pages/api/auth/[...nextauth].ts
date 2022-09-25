import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {DataTypes, ModelCtor, Sequelize} from "sequelize";
import SequelizeAdapter, {models} from "@next-auth/sequelize-adapter";

const db = new Sequelize(process.env.POSTGRES_CONN_STRING || "");
export const createUserModel = (): ModelCtor<any> => {
    return db.define("user", {
        ...models.User,
        role: {
            type: DataTypes.TEXT,
            defaultValue: "guest",
        },
    });
};

const adapter = SequelizeAdapter(db, {
    models: {
        Account: db.define("account", {
            ...models.Account,
            id_token: {
                type: DataTypes.TEXT,
            },
        }),
        User: createUserModel(),
    },
})

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    adapter,
    pages: {
        signIn: "/auth/signin",
    },
    theme: {
        colorScheme: "auto",
    },
    session: {strategy: "jwt"},
    callbacks: {
        async session({session, user, token}) {
            // @ts-ignore
            session.provider = token.provider;
            // @ts-ignore
            session.userRole = token.userRole;
            return session;
        },
        async jwt({token, account, user}) {
            if (!token.provider && account) {
                token.provider = {
                    name: account.provider,
                    id: account.providerAccountId,
                };
            }

            if (!token.userRole && user) {
                token.userRole = user.role;
            }

            return token;
        },
    },
};

export default NextAuth(authOptions);