import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { stripTrailingSlash } from "@/lib/utils"

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await fetch(stripTrailingSlash(process.env.ANTIMATER_API_URL)+"/api/auth/login", {body: JSON.stringify(credentials)})
                // const user = { "email": "john.doe@example.com", "name": "John Doe" }
                return user
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.ANTIMATTER_SECRET,
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async session({ session }) {
            // Get information and add to the session if needed
            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
