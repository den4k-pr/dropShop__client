"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"

export const HeaderProfile = ({name} : {name: any}) => {
    const session = useSession();

    return(
        <div className="profile">
            <nav className="profile__link">
                <Image src="/icons/profile.png" width={36} height={36} alt="" />
                <div className="profile__menu">
                    {session?.status !== "loading" ? 
                    session?.data ? 
                    <>
                        <div className="profile__menu--top">
                        <h3 className="profile__menu--top-name">{name}</h3>
                            <span className="profile__menu--top-text">дякую що ви з нами!</span>
                        </div>
                        <div className="profile__menu--bottom">
                            <Link href="/store">
                                Історія перегляду
                            </Link>
                            <Link href="/sold-products">
                                Історія покупок
                            </Link>
                            <Link style={{display: "flex", alignItems: "center", gap: "10px"}} href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                                <Image src="/icons/sign.svg" width={25} height={25} alt="signaut" />
                                Вийти з акаунту
                            </Link>
                        </div>
                    </>
                    : 
                    <>
                        <section className="profile__menu--login">
                            <h3 className="profile__menu--login-title">Вже є акаунт?</h3>
                            <Link href="/login" className="profile__menu--login-button">Війти в акаунт</Link>
                        </section>
                        <section className="profile__menu--register">
                            <h3 className="profile__menu--register-title">Не маєте акаунту?</h3>
                            <span className="profile__menu--register-message">Створіть свій акаунт і отримайте нові функції і знижки</span>
                            <Link href="/login" className="profile__menu--register-button">Створити акаунт</Link>
                        </section>
                    </>
                    : <div className="profile__menu--loading"></div>}
                </div>
            </nav>
        </div>
    )
}