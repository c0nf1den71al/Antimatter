import { Navigation } from "@/components/shared/horizontal-navigation"

export default function DashboardLayout({children}) {
    return (
        <div className="flex-col flex h-screen">
            <Navigation />
            <div className="container mx-auto py-10 grow">
                {children}
            </div>
        </div>
    )
}