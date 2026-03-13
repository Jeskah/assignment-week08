import db from "utils/db.js/page"
import Image from "next/image"

export default async function Artist({ params }) {

const { id } = await params

const result = await db.query(
    `SELECT * FROM artists WHERE id = $1`,
    [Number(id)]
)

const artist = result.rows[0]

if (!artist) {
    return <div className="p-8">Artist not found</div>
}

console.log("PARAMS:", params)
console.log("ID:", id)
console.log("NUMBER ID:", Number(id))

return (
    <div className="p-8">

    <h2>{artist.name}</h2>

    <Image
        src={artist.img_url}
        className="w-80 mt-4"
        width={300}
        height={300}
        alt="image"
    />

    <p className="mt-4">{artist.year}</p>
    <p className="mt-4">{artist.bio}</p>
    <p>Rank:{artist.rank}</p>

    </div>
)
}