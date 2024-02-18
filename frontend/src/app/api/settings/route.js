import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Get settings
export async function GET(request) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken
    
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/settings`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })

    let data = await res.json()

    // Expose Port Environment Vars
    data.push({
        name: "ports",
        value: {
            web: process.env.ANTIMATTER_WEB_PORT,
            api: process.env.ANTIMATTER_API_PORT
        }
    })

    return Response.json(data)
}

// Update setting
export async function POST(request) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken

    const body = await request.json()
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/settings`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()
    return Response.json(data)
}