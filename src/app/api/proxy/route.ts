export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url, `https://${request.headers.get('host')}`);

  // Log URL asli untuk memverifikasi input
  console.log(`Original request URL: ${url.toString()}`);
  
  // Hapus '/api/proxy' dan ambil query params setelahnya
  const apiPath = url.pathname.replace('/api/proxy', '') + url.search;
  
  // Gabungkan URL MangaDex API
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;

  console.log(`Fetching from MangaDex API: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MangaiceClient/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Memungkinkan semua asal
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Memungkinkan metode HTTP tertentu
      },
    });    
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
