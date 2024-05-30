import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Get templates
export async function GET(request) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;

  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/templates`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  return Response.json(data);
}

// Create Template
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;

  const data = await request.formData();

  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/templates/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    },
  );

  const responseData = await res.json();
  return Response.json(responseData);
}
