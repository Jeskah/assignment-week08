import db from "utils/db.js/page";
import { auth } from "@clerk/nextjs/server"

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const artistId = url.searchParams.get("artistId");


const query = artistId
    ? `SELECT messages.*, braggers.username
      FROM messages
      JOIN braggers ON messages.bragger_id = braggers.id
      WHERE artist_id = $1
      ORDER BY messages.id DESC`
    : `SELECT messages.*, braggers.username
      FROM messages
      JOIN braggers ON messages.bragger_id = braggers.id
      ORDER BY messages.id DESC`;

    const params = artistId ? [artistId] : [];

    const result = await db.query(query, params);

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

export async function POST(req) {
  try {
    const { content, artistId, braggerId } = await req.json();

    // Optional: log Clerk ID if you want to see it
    const { userId } = auth() || {};
    console.log("Clerk USER ID (may be undefined in dev):", userId);

    // Insert message using your existing braggerId
    const result = await db.query(
      `INSERT INTO messages (content, artist_id, bragger_id) VALUES ($1,$2,$3) RETURNING *`,
      [content, artistId, braggerId]
    );

    return new Response(JSON.stringify(result.rows[0] || {}), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("Error inserting message:", error);
    return new Response(JSON.stringify({ error: "Failed to post message" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}