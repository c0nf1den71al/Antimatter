"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Orbit } from "lucide-react"

export function NavigationLinks() {
    const path = usePathname()
    return (
        <nav className="mr-6 flex items-center space-x-4 lg:space-x-6">
            <Link href="/dashboard">
                <Orbit className="h-6" />
            </Link>
            
            <Link
                href="/dashboard/engagements"
                className={`text-sm font-medium transition-colors hover:text-primary ${path.includes("engagements") ? "" : "text-muted-foreground"}`}
            >
                Engagements
            </Link>
            <Link
                href="/dashboard/vulnerabilities"
                className={`text-sm font-medium transition-colors hover:text-primary ${path.includes("vulnerabilities") ? "" : "text-muted-foreground"}`}
            >
                Vulnerabilities
            </Link>
            <Link
                href="/dashboard/templates"
                className={`text-sm font-medium transition-colors hover:text-primary ${path.includes("templates") ? "" : "text-muted-foreground"}`}
            >
                Templates
            </Link>
            <Link
                href="/dashboard/settings"
                className={`text-sm font-medium transition-colors hover:text-primary ${path.includes("settings") ? "" : "text-muted-foreground"}`}
            >
                Settings
            </Link>
        </nav>
    )
}