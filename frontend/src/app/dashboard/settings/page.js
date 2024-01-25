import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export const metadata = {
    title: "Antimatter - Settings"
}

const breadcrumbItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        isCurrentPage: true
    }
]

export default async function Settings() {

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex pt-10 pb-5 flex-col">
            </div>
        </>
    )
}
