import db from "utils/db.js/page"
import Image from "next/image"
import ChatBox from "@/components/ChatBox"

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

// console.log("PARAMS:", params)
console.log("ID:", id)
console.log("NUMBER ID:", Number(id))

return (
    <div className="flex flex-col p-10 items-center">

    <h2>{artist.name}</h2>

    <Image
        src={artist.img_url}
        className="mt-4"
        width={300}
        height={300}
        alt="image"
    />

<div className="p-15">
    <p>{artist.year}</p>
    <p>{artist.bio}</p>
    <p>Rank:{artist.rank}</p>
</div>

    <ChatBox artistId={id}/>
</div>


)
}