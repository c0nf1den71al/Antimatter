import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { SidebarNavigation } from "@/components/shared/sidebar-navigation"
import { Summary } from "@/components/features/engagement/summary"
import { ArrowLeft } from "lucide-react"

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
            title: <><ArrowLeft className="mr-2 h-4 w-4" /> Back</>,
            href: `/dashboard/vulnerabilities`,
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
