import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"
import { EngagementDetails } from "@/components/features/engagement/engagement-details"
import { ArrowLeft } from "lucide-react"

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
            isCurrentPage: true,
            type: "engagement"
        }
    ]

    const sidebarNavItems = [
        {
            title: <><ArrowLeft className="mr-2 h-4 w-4" /> Back</>,
            href: `/dashboard/engagements`,
            variant: "outline",
            className: "mb-4"
        },
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
                    <SidebarNavigation items={sidebarNavItems} addButton={true} />
                </aside>
                <div className="flex-1">
                    <EngagementDetails engagementId={params.engagementId} />
                </div>
            </div>
        </>
    )
}
