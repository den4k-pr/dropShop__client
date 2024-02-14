import { Search } from "@/ui/MeinPartials/Search"
import { CategoriesCart } from "./CategoriesCart"
import { getAllCategories } from "@/hooks/getAllCategories"
import { Category } from "@/temaplates/templateTypes"


export const CategoriesCarts = async () => {

    const categories = await getAllCategories()

    return(
        <section className="categoriesCarts container">
            <div className="categoriesCarts__searchBody">
                <Search catalog={false} main={true} openFormState />
            </div>
            <h2 style={{paddingTop: "40px"}} className="main--title">Основні категорії</h2>
            <nav className="categoriesCarts__categories container">
                {categories.map((category: Category, index: number) =>
                    <CategoriesCart 
                        key={index}
                        href={`/catalog/${category.categorySlug}?sort=price-high-to-low&page=1`} 
                        images={category.images}
                        title={category.name}
                    />
                )}
            </nav>
        </section>
    )
}