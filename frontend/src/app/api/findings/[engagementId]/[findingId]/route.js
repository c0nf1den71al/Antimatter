import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Delete finding
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;
  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/findings/${params.engagementId}/${params.findingId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  return Response.json(data);
}

// Update finding
export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;

  const body = await request.json();
  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/findings/${params.engagementId}/${params.findingId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return Response.json(data);
}
