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
                    const res = await fetch(stripTrailingSlash(process.env.ANTIMATTER_API_URL)+"/api/auth/login", {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: credentials.email, password: credentials.password })
                    })

                    const user = await res.json()
                    console.log(user)
                    if (res.ok && user) return user
                    return null
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.ANTIMATTER_TOKEN_SECRET,
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async session({ session, token }) {
            session.user = { ...token }
            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
