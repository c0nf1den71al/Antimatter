import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Templates"
}

const breadcrumbItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Templates",
        href: "/dashboard/templates",
        isCurrentPage: true
    }
]

export default async function Templates() {

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pt-10 pb-5 flex-col">
            </div>
        </>
    )
}
