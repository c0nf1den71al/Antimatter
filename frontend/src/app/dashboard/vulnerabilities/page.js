import { columns } from "@/components/features/vulnerabilities/columns"
import { VulnerabilitiesTable } from "@/components/features/vulnerabilities/vulnerabilities-table"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Vulnerabilities"
}

async function getData() {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52fab322ae9f00ac21f5ae3d2cff70",
            identifier: "VULN-001",
            name: "Remote Code Execution Via SQL Injection",
            category: "Web",
        },
        {
            id: "728ed52fab322ae9f00ac21f5ae3d2cff70",
            identifier: "VULN-002",
            category: "Web",
            name: "Invalid Content-Security-Policy (CSP) Header",
        }
        // ...
    ]
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
    const data = await getData()

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex py-5 flex-col">
                <VulnerabilitiesTable columns={columns} data={data}/>
            </div>
        </>
    )
}
