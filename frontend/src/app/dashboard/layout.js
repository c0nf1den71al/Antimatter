import { Navigation } from "@/components/shared/horizontal-navigation"

export default function DashboardLayout({children}) {
    return (
        <div className="flex-col flex">
            <Navigation />
            <div className="container mx-auto py-10">
                {children}
            </div>
        </div>
    )
}