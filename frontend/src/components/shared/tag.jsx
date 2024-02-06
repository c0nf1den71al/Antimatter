import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex uppercase items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                purple: "border-transparent bg-purple-100 text-purple-700",
                red: "border-transparent bg-red-100 text-red-700",
                amber: "border-transparent bg-amber-100 text-amber-600",
                blue: "border-transparent bg-blue-100 text-blue-700",
                gray: "border-transparent bg-gray-100 text-gray-700",
                green: "border-transparent bg-green-100 text-green-800",
                white: "text-gray-800"
            },
        }
    }
)

export function Tag({ children, variant }) {
    return (
        <div className={cn(badgeVariants({ variant }))}>
            {children}
        </div>
    )
}