import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"
import { GeneralSettings } from "@/components/features/settings/general-settings"

export const metadata = {
    title: "Antimatter - Settings"
}

const breadcrumbItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        isCurrentPage: true
    },
    {
        title: "General",
        href: "/dashboard/settings",
        isCurrentPage: true
    }
]

const sidebarNavItems = [
    {
        title: "General",
        href: `/dashboard/settings`,
    },
    {
        title: "Findings & Vulnerabilities",
        href: `/dashboard/settings/vulnerabilities`,
    },
    {
        title: "Users & Roles",
        href: `/dashboard/settings/users`,
    },
    {
        title: "Templates",
        href: `/dashboard/settings/templates`,
    },
    {
        title: "API Keys",
        href: "/dashboard/settings/apikeys"
    },
    {
        title: "Logs",
        href: `/dashboard/settings/logs`
    }
]

export default async function Settings() {

    return (
        <div className="flex flex-col h-full">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pb-5 pt-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 grow">
                <aside className="-mx-4 lg:w-1/6">
                    <SidebarNavigation items={sidebarNavItems} />
                </aside>
                <div className="flex-1 h-full relative">
                    <GeneralSettings />
                </div>
            </div>
        </div>
    )
}
