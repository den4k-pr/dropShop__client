"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export const RoutingPoints = () => {
    const route = useParams()

    return (
        <nav className="route">
            <Link href="/" className="route-link">home</Link>
             / 
            <p style={{textDecoration: route.subCategorySlug ? "underline" : "none", opacity: route.subCategorySlug ? "1" : "0.8"}} className="route-link">{route.categorySlug}</p>
             {route?.subCategorySlug && "/"} 
            <p style={{textDecoration: "none", opacity: "0.8"}} className="route-link">{route?.subCategorySlug}</p>
        </nav>
    )
}