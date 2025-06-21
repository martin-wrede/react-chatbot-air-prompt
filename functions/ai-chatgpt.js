export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method Not Allowed" }, 405);
  }

  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt) {
      return jsonResponse({ error: "Missing prompt" }, 400);
    }

    // ✅ FIXED: Correct status 200 for success
    return jsonResponse({ reply: `Echo: ${prompt}` });

  } catch (err) {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: corsHeaders(),
  });
}
