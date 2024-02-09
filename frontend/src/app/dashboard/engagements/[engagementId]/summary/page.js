import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"
import { Summary } from "@/components/features/engagement/summary"
import { Separator } from "@/components/ui/separator"

export default async function ExecutiveSummary({ params }) {

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
            isCurrentPage: true,
            type: "engagement"
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
        <div className="flex flex-col h-full">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pb-5 pt-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 grow">
                <aside className="-mx-4 lg:w-1/6">
                    <SidebarNavigation items={sidebarNavItems} addButton={true} />
                </aside>
                <div className="flex-1 h-full relative">
                    <Summary engagementId={params.engagementId} />
                </div>
            </div>
        </div>
    )
}
