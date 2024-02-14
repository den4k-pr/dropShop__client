import { Basket } from "@/ui/headerPartials/Basket";
import { User, getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { HeaderProfile } from "./headerProfile";
import { authConfig } from "@/configs/auth"
import { SupportSystem } from "./supportSystem";
import axios from "axios";

async function getData() {
    try{
        const res = await axios.get(`http://localhost:4200/api/users`);

        return res.data;
    }catch(error) {
        throw new Error("Failed to fetch data")
    }
}


export const Header = async () => {
    const session = await getServerSession(authConfig);

    const users = await getData()

    return(
        <header className="header">
            <div className="header__top">
                <Link className="header__top-logo" href="/">
                    <Image src="/logo.png" width={160} height={55} alt="" />
                </Link>
                <HeaderProfile name={users.filter((user: User) => user.email == session?.user?.email).map((user: User) => user.name)} />
                <Basket />
            </div>
            <SupportSystem />
        </header>
    )
}