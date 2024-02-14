"use client"

import { RoutingPoints } from "@/ui/MeinPartials/routingPoints"
import { ProductsList } from "./ProductList"
import { useParams, useRouter, useSearchParams } from "next/navigation"

export const Products = () => {
   
    const route = useParams()
    const sort = useSearchParams();

    const getPage = useSearchParams()

    return(
        <section className="catalog__box">
            <RoutingPoints />

            <ProductsList choosePage={getPage.get("page")} sortByPrice={sort.get("sort")} categorySlug={route.categorySlug} subCategorySlug={route.subCategorySlug} />
        </section>
    )
}