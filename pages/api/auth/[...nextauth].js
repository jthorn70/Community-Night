import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import axios from "axios";

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async jwt(token, user, account) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },
        async session(session, user) {
            session.user = user;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.AUTH_SECRET,
    session: {
        jwt: true,
    },
    debug: process.env.NODE_ENV !== "production",
});
