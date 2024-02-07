import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"

export const metadata = {
    title: "Antimatter - Client"
}

export default async function Client({ params }) {

    const breadcrumbItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Clients",
            href: "/dashboard/clients"
        },
        {
            title: params.clientId,
            isCurrentPage: true,
            type: "client"
        }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pb-5 pt-10 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/6">
                </aside>
                <div className="flex-1">
                </div>
            </div>
        </>
    )
}
