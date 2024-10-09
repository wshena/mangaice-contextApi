export const dynamic = 'force-dynamic'; // Ensure dynamic response

export async function GET(request: Request) {
  const url = new URL(request.url);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url.pathname}${url.search}`; // Build the API URL

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Set the method according to your needs
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MangaiceClient/1.0',
      },
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    // Return the response from the MangaDex API
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
