import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

// Create finding
export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken

    const body = await request.json()
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/findings/${params.engagementId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()
    return Response.json(data)
}