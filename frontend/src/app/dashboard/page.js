import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    return (
        <h1>Dashboard</h1>
        // Use tremor charts here https://www.tremor.so
    )
}