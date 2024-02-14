"use client"

import { useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import Image from "next/image"
import Link from "next/link"

export const Basket = () => {

    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    return(
        <Link href="/cart" className="header__top__basket" style={{marginTop: "-3px"}}>
            <Image src="/icons/cart.svg" width={34} height={34} alt=""/>
            <span className="header__top__basket-count">{cartItems.length}</span>
        </Link>
    )
}