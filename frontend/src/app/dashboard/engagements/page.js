import { columns } from "@/components/features/engagements/columns"
import { EngagementsTable } from "@/components/features/engagements/engagements-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Engagements"
}

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

export default async function Engagements() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex py-5 flex-col">
                <EngagementsTable columns={columns} />
            </div>
        </>
    )
}
