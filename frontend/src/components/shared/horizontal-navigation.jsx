import { NavigationLinks } from "./navigation-links"
import { AccountDropdown } from "./account-dropdown"
import { GlobalSearch } from "./global-search"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function Navigation() {
    const session = await getServerSession(authOptions)
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <NavigationLinks />
                <div className="ml-auto flex items-center space-x-4">
                    <GlobalSearch placeholder="Search..."/>
                    <AccountDropdown session={session}/>
                </div>
            </div>
        </div>
    )
}