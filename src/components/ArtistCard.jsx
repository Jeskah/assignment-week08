import Image from "next/image"
import Link from "next/link"

export default function ArtistCard({ artist }) {

    return (

        <Link href={`/artists/${artist.id}`}>

        <div className="flex relative w-35 gap-3 border rounded-lg overflow-hidden">

            <div className="cursor-pointer">
                <Image src={artist.img_url} alt={artist.id} width={200} height={200}
                className="w-full h-50 object-cover"
                />        
        
                <div className="absolute inset-0 bg-black/50 p-3 flex flex-col justify-end text-white">

                <div className="relative bottom-7">
                    <h3>{artist.name}</h3>
                    <h6>RANK:{artist.rank}</h6>
                    {/* <h2>{artist.genres}</h2> */}
                    <button>Brag!</button>
            </div>
        </div>
        </div>
        </div>
        </Link>
    )
    
    
    }