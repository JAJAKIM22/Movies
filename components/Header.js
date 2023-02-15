import Image from "next/image"
import HeaderItem from "./HeaderItem"
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"

function Header() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
     <div className="flex  flex-grow justify-evenly max-w-2xl ">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="TRENDING" Icon={LightningBoltIcon} />
        <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} />
        <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} />
        <HeaderItem title="SEARCH" Icon={SearchIcon} />
        <HeaderItem  title={session.user.name} Icon={UserIcon} />
        </div>   
   {/* <Image  className="object-contain"
   src="https://links.papareact.com/ua6"
   width={200}
   height={100}
    /> */}
    <div>
      {/* <p> {session ? `${session.user.name}` : "signin"}  </p> */}
      
    <button onClick={signOut}  className="rounded-md bg-gray-100 text-black  hover:text-black-200  w-40 text-lg active:text-red-500">Sign Out</button>
    </div>
    </header>
    )
  }
  
  
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
     <div> 
    <button onClick={signIn}  className="rounded-md bg-gray-100 text-black  hover:text-black-200  w-40 text-lg active:text-red-500">Sign in</button>
    </div>
    </header>
  )
}

export default Header