"use client";
import { useState } from "react"
import { signIn } from "next-auth/react";
import type { FormEventHandler, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export const Login = ({isSmallScreen, authSections, setAuthSections} : {isSmallScreen: boolean, authSections: string, setAuthSections: Dispatch<SetStateAction<string>>}) => {
    const [message, setMessaage] = useState("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
  
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
  
      if (res && !res.error) {
        window.location.replace("/");
      } else {
        console.log(res);
        setMessaage("Такого користувача не існує")
      }
    };

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return(
        <div style={{
            flex: authSections == "login" ? "52%" : "48%",
            minHeight: isSmallScreen ? authSections == "login" ? "90vh" : "25vh" : "90vh",
            transition: isSmallScreen ? "" : ".2s"
          }} 
          className="signin__nav"
        >
            
            <form className="signin__nav--form" onSubmit={handleSubmit}>
            <h2 className="signin__nav-title">Вже є акаунт?</h2>
                {authSections == "login" ? 
                <>
                    <label className="signin__nav--form-label">Електрона пошта</label>
                    <input className="signin__nav--form-input" type="email" name="email" required />
                    <label className="signin__nav--form-label">Пароль</label>
                    <input className="signin__nav--form-input" type="password" name="password" required />
                </> : <></>
                }
                <button onClick={() => setAuthSections("login")} className="signin__nav--form-button" type="submit">Авторизуватись</button>
                <button onClick={() => signIn("google", { callbackUrl })} className="googleButton">
                  <Image src="/icons/google.svg" width={25} height={25} alt="google" />
                  <span>Sign in with Google</span>
                </button>
                <span style={{textAlign: "center", paddingTop: "10px"}}>{message}</span>
            </form>
        </div>
    )
}