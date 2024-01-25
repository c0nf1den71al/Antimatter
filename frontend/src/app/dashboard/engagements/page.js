import { columns } from "@/components/features/engagements/columns"
import { EngagementsTable } from "@/components/features/engagements/engagements-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Engagements"
}

export default async function Engagements() {
    const breadcrumbItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Engagements",
            href: "/dashboard/engagements",
            isCurrentPage: true
        }
    ]
    
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pt-10 pb-5 flex-col">
                <EngagementsTable columns={columns} />
            </div>
        </>
    )
}
