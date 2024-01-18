import { redirect } from "next/navigation"

export default function NotFound() {
    redirect("/auth/login")
    return (
        <div>
            Redirecting...
        </div>
    )
}