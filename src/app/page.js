import db from "utils/db.js/page";
import ArtistCard from "@/components/ArtistCard";

export default async function Artists() {

  const result = await db.query(`SELECT * FROM artists`);
  const artists = result.rows;

  return (
    <div className="flex flex-col">
            <h5 className="p-5 text-center">Discover New Favourites...</h5>
    <div className="flex flex-row flex-wrap gap-10 justify-center">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}

      </div>

    </div>
  )
}