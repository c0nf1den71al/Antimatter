import { columns } from "@/components/features/vulnerabilities/columns"
import { VulnerabilitiesTable } from "@/components/features/vulnerabilities/vulnerabilities-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Vulnerabilities"
}

const breadcrumbItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Vulnerabilities",
        href: "/dashboard/vulnerabilities",
        isCurrentPage: true
    }
]

export default async function Vulnerabilities() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pt-10 pb-5 flex-col">
                <VulnerabilitiesTable columns={columns}/>
            </div>
        </>
    )
}
