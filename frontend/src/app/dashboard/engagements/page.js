// import { columns } from "@/components/features/engagements/columns"
// import { DataTable } from "@/components/features/engagements/dataTable"
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
            <Breadcrumbs items={breadcrumbItems}/>
            {/* <div className="flex py-5 flex-col">
                <DataTable columns={columns} />
            </div> */}
        </>
    )
}
