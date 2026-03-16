import db from "utils/db.js/page";
import ArtistCard from "@/components/ArtistCard";
// import Link from "next/link";

export default async function Artists() {

    const result = await db.query(`SELECT * FROM artists`)
    const artists = result.rows
    
    return (
    <div className="flex flex-wrap gap-10 justify-center items-center p-8">

            <h2>browse all artists</h2>

            {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    )
}
