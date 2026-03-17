import { currentUser, auth} from '@clerk/nextjs/server'
import Image from 'next/image'
export default async function Page() {
    const authUser = await auth()
    console.log(authUser)
    // in particualr the userId property

    // if you need actual user details - name, email, so on
    const user = await currentUser()

    console.log(user)
    return (
        <div>
            <h2>This is the users page</h2>
            <h3>{user.username}</h3>
            <Image height={400} width={400} src={user.imageUrl} alt="" />
        </div>
    )
}