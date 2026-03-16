import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <div className="flex flex-col items-center justify-between w-full">
                <Image 
                src="/brag.png" 
                alt="brag logo" 
                width={150} 
                height={150}
                className="pb-10 pt-5 scroll-pt-0.5"
                />

            <div className="px-2 py-1 uppercase flex gap-5">
                <Link href='/'className="hover:text-gray-300">Home</Link>
                <Link href='/artists'className="hover:text-gray-300" >Artists</Link>
                <Link href='/shuffle'className="hover:text-gray-300">Shuffle</Link>
                <Link href='/users/you'className="hover:text-gray-300">Profile</Link>
            </div>
        </div>
    )
}