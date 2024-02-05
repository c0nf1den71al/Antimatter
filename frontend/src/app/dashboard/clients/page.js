import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { ClientsTable } from "@/components/features/clients/clients-table"
import { columns } from "@/components/features/clients/columns"

export const metadata = {
    title: "Antimatter - Clients"
}

const breadcrumbItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Clients",
        href: "/dashboard/clients",
        isCurrentPage: true
    }
]

export default async function Clients() {

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pt-10 pb-5 flex-col">
                <ClientsTable columns={columns} />
            </div>
        </>
    )
}
