import db from "utils/db.js/page";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");

    const query = artistId
      ? "SELECT * FROM messages WHERE artist_id = $1 ORDER BY id ASC"
      : "SELECT * FROM messages ORDER BY id ASC";

    const params = artistId ? [artistId] : [];

    const result = await db.query(query, params);

    // Always return an array, even if empty
    return new Response(JSON.stringify(result.rows || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { content, artistId, braggerId } = await request.json();

    const result = await db.query(
      "INSERT INTO messages (content, artist_id, bragger_id) VALUES ($1,$2,$3) RETURNING *",
      [content, artistId, braggerId]
    );

    return new Response(JSON.stringify(result.rows[0] || {}), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}