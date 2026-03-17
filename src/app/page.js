import db from "utils/db.js/page";
import ArtistCard from "@/components/ArtistCard";

export default async function Artists() {

  const result = await db.query(`SELECT * FROM artists`);
  const artists = result.rows;

  return (
    <div className="flex flex-col items-center overflow-scroll">

            <h5 className="pb-10 pt-5 text-center">Discover New Favourites...</h5>

    <div className="flex flex-row gap-10 items-center cursor-pointer pb-50">

        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} 
          />
        ))} 
      </div>
    </div>
  )
}