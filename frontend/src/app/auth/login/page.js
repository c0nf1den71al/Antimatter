import { Orbit } from "lucide-react"
import { LoginForm } from "@/components/features/login/login-form"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Login",
  description: "Login",
}

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Orbit className="mr-2 h-6" />
            Antimatter.
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Login to an account using your credentials below.
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account? Contact your instance administrator.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}