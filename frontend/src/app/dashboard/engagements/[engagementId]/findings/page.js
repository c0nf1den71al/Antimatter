import { columns } from "@/components/features/engagement/columns"
import { FindingsTable } from "@/components/features/engagement/findings-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"

export const metadata = {
    title: "Antimatter - Findings"
}

export default async function Engagement({ params }) {

    const breadcrumbItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Engagements",
            href: "/dashboard/engagements"
        },
        {
            title: params.engagementId,
            type: "engagement",
            href: `/dashboard/engagements/${params.engagementId}`

        },
        {
            title: "Findings",
            isCurrentPage: true
        }
    ]

    const sidebarNavItems = [
        {
            title: "Overview",
            href: `/dashboard/engagements/${params.engagementId}`,
        },
        {
            title: "Executive Summary",
            href: `/dashboard/engagements/${params.engagementId}/summary`,
        },
        {
            title: "Findings",
            href: `/dashboard/engagements/${params.engagementId}/findings`,
        }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pb-5 pt-10 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/6">
                    <SidebarNavigation items={sidebarNavItems} addButton={true}/>
                </aside>
                <div className="flex-1">
                    <FindingsTable engagementId={params.engagementId} columns={columns} />
                </div>
            </div>
        </>
    )
}
