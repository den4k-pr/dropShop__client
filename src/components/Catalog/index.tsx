
import { getAllCategories } from "@/hooks/getAllCategories"
import { ComputerNavigation } from "./computerNavigation"
import { Products } from "./ProductsComponent/products"

export const Catalog = async () => {

    const categories = await getAllCategories()

    return(
        <div className="catalog container">
            <ComputerNavigation categories={categories} />
            <Products />
        </div>
    )
}