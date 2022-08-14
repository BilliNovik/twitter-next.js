import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.SECRET,
    callbacks: {
        async session({ session, user, token }) {
            session.user.username = session.user.name.split(' ').join('').toLowerCase();
            session.user.uid = token.sub;
            return session
        },
    }
})