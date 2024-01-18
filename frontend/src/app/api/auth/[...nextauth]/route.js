import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await fetch(process.env.API_URL+"/api/auth/login", {body: JSON.stringify(credentials)})
                // const user = { "email": "john.doe@example.com", "name": "John Doe" }
                return user
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
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
