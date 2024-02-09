import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"

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
        title: "Findings",
        href: `/dashboard/settings/findings`,
    },
    {
        title: "Users",
        href: `/dashboard/settings/users`,
    },
    {
        title: "Templates",
        href: `/dashboard/settings/templates`,
    },
    {
        title: "Other",
        href: `/dashboard/settings/other`
    }
]

export default async function Settings() {

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pb-5 pt-10 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/6">
                    <SidebarNavigation items={sidebarNavItems} />
                </aside>
                <div className="flex-1">

                </div>
            </div>
        </>
    )
}
