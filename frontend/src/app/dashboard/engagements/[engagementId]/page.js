import { columns } from "@/components/features/engagements/columns"
import { EngagementsTable } from "@/components/features/engagements/engagements-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Engagement"
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
            isCurrentPage: true
        }
    ]

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex py-5 flex-col">
                {/* <EngagementsTable columns={columns} /> */}
            </div>
        </>
    )
}
