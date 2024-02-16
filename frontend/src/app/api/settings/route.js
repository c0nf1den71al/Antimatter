
// Get settings

export async function GET(request) {
    const data = {
        "webPort": process.env.ANTIMATTER_WEB_PORT,
        "apiPort": process.env.ANTIMATTER_API_PORT
    }
    return Response.json(data)
}