import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

// List engagements
export async function GET(request) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/engagements?showClientName=true`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })

    const data = await res.json()
    return Response.json(data)
}

// Create engagement
export async function PUT(request) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken

    const body = await request.json()
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/engagements`, {
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