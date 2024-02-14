import { Basket } from "@/ui/headerPartials/Basket"
import Link from "next/link"
import { HeaderProfile } from "./HeaderProfile"
import { getServerSession } from "next-auth"
import { authConfig } from "@/configs/auth"
import { User } from "@/temaplates/templateTypes"
import Image from "next/image"
import axios from "axios"

async function getData() {

    try{
        const res = await axios.get(`http://localhost:4200/api/users`,);

        return res.data;
    }catch(error) {
        throw new Error("Failed to fetch data")
    }
}

export const HeaderTop =  async () => {
    const session = await getServerSession(authConfig);

    const users = await getData()

    return(
        <div className="header__top">
            <Link className="header__top-logo" href="/">
                <Image src="/logo.png" width={160} height={55} alt="" />
            </Link>
            <HeaderProfile name={users.filter((user: User) => user.email == session?.user?.email).map((user: User) => user.name)} />
            <Basket />
        </div>
    )
}