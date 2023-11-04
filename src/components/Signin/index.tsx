"use client"

import { useState, useEffect } from "react"
import { Login } from "./login"
import { Register } from "./register"

declare global {
    interface Window {
      gapi: any;
    }
  }

export const Signin = () => {
    const [authSections, setAuthSections] = useState("login")
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 925);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    

    return(
        <section className="signin">
            <Login isSmallScreen={isSmallScreen} authSections={authSections} setAuthSections={setAuthSections}/>
            <Register isSmallScreen={isSmallScreen} authSections={authSections} setAuthSections={setAuthSections}/>
        </section>
    )
}