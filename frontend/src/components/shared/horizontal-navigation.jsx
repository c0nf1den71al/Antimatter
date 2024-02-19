import { NavigationLinks } from "./navigation-links"
import { AccountDropdown } from "./account-dropdown"
import { GlobalSearch } from "./global-search"
import { Ratio } from "lucide-react"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function Navigation() {
    const session = await getServerSession(authOptions)
    if (!session) {
        fetch("/api/auth/signout", {method: "POST"})
        redirect("/auth/login")
    }
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
            <Ratio className="h-6 mr-3" />
                <NavigationLinks />
                <div className="ml-auto flex items-center space-x-4">
                    <GlobalSearch />
                    <AccountDropdown session={session}/>
                </div>
            </div>
        </div>
    )
}