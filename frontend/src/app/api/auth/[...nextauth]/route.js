import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { stripTrailingSlash } from "@/lib/utils"

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/auth/login`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: credentials.email, password: credentials.password })
                    })

                    const user = await res.json()

                    if (res.ok && user) return user
                    return null
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.access_token) {
                token.accessToken = user.access_token
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
