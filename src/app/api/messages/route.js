import db from "@/utils/db";

export async function GET() {
  const result = await db.query(`SELECT * FROM messages`);

    return Response.json(rows);
    }

    export async function POST(request) {
    const { content, artistId, braggerId } = await request.json();

    await db.query(
        `INSERT INTO messages (content, artist_id, bragger_id) VALUES ($1,$2,$3)`,
        [content, artistId, braggerId]
    );

    return Response.json({ success: true });
    }