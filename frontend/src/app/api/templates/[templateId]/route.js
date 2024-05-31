import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Download templates
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;

  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/templates/${params.templateId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const contentType = res.headers.get("Content-Type");
  const contentDisposition = res.headers.get("Content-Disposition");

  // Create a new readable stream from the backend response
  const stream = new ReadableStream({
    start(controller) {
      const reader = res.body.getReader();
      return pump();

      function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const accessToken = session.accessToken;

  const res = await fetch(
    `http://backend:${process.env.ANTIMATTER_API_PORT}/api/templates/${params.templateId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const responseData = await res.json();

  return Response.json(responseData);
}
