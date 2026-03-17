
import db from "utils/db.js/page";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const artistId = url.searchParams.get("artistId");

    const query = artistId
        ? `SELECT messages.*, braggers.username
          FROM messages
          JOIN braggers ON messages.bragger_id = braggers.clerk_id
          WHERE artist_id = $1
          ORDER BY messages.id ASC`
        : `SELECT messages.*, braggers.username
          FROM messages
          JOIN braggers ON messages.bragger_id = braggers.clerk_id
          WHERE artist_id = $1
          ORDER BY messages.id DESC`;

    const params = artistId ? [artistId] : [];
    const result = await db.query(query, params);

    return new Response(JSON.stringify(result.rows || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET messages error:", error);
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    console.log("AUTH DEBUG:", userId);

    if (!userId) {
      return new Response("Not authenticated", { status: 401 });
    }

    const { content, artistId } = await req.json();

    const result = await db.query(
      `INSERT INTO messages (content, artist_id, bragger_id) 
      VALUES ($1, $2, $3)
      RETURNING *`,
      [content, artistId, userId]
    );

    const usernameResult = await db.query(
      `SELECT username FROM braggers WHERE clerk_id = $1`,
      [userId]
    );

    const messageWithUsername = {
      ...result.rows[0],
      username: usernameResult.rows[0]?.username || "Unknown",
    };

    return new Response(JSON.stringify(messageWithUsername), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("POST messages error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to post message" }),
      { status: 500, headers: { "Content-Type": "application/json" },
      }
    );
  }
}


export async function DELETE(req) {
  try {
    const { messageId } = await req.json();

    if (!messageId) {
      return new Response(JSON.stringify({ error: "No message ID provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional: verify user is owner before deleting
    const { userId } = getAuth(req) || {};
    if (!userId) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete only if current user owns the message
    await db.query(
      `DELETE FROM messages WHERE id = $1 AND bragger_id = $2`,
      [messageId, userId]
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("DELETE messages error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete message" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}