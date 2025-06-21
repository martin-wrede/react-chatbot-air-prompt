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
    const { message, messages, files } = body;

    // Validierung der erforderlichen Felder
    if (!message && !messages) {
      return jsonResponse({ error: "Missing message or messages" }, 400);
    }

    // Simuliere eine AI-Antwort (hier würdest du normalerweise eine echte AI API aufrufen)
    let aiResponse = `Hallo! Ich habe deine Nachricht erhalten: "${message}"`;
    
    // Füge Informationen über hochgeladene Dateien hinzu
    if (files && files.length > 0) {
      aiResponse += `\n\nIch sehe, dass du ${files.length} Datei(en) hochgeladen hast:`;
      files.forEach((file, index) => {
        aiResponse += `\n- ${file.name} (${formatFileSize(file.size)})`;
      });
    }

    // Simuliere Conversation History
    if (messages && messages.length > 1) {
      aiResponse += `\n\nIch kann sehen, dass wir bereits ${messages.length - 1} Nachrichten ausgetauscht haben.`;
    }

    // Beispiel für ICS-Kalender-Generierung (falls gewünscht)
    const shouldGenerateCalendar = message.toLowerCase().includes('kalender') || 
                                  message.toLowerCase().includes('termin') || 
                                  message.toLowerCase().includes('meeting');
    
    if (shouldGenerateCalendar) {
      aiResponse += `\n\nHier ist ein Beispiel-Kalendereintrag für dich:

\`\`\`ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mein Chatbot//DE
BEGIN:VEVENT
UID:${Date.now()}@chatbot.local
DTSTART:20250622T100000Z
DTEND:20250622T110000Z
SUMMARY:Beispiel Termin
DESCRIPTION:Automatisch generiert vom Chatbot
LOCATION:Online
END:VEVENT
END:VCALENDAR
\`\`\``;
    }

    // Rückgabe im OpenAI-kompatiblen Format
    return jsonResponse({
      choices: [{
        message: {
          role: "assistant",
          content: aiResponse
        }
      }]
    });

  } catch (err) {
    console.error("Server error:", err);
    return jsonResponse({ error: "Invalid JSON or server error" }, 400);
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

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}