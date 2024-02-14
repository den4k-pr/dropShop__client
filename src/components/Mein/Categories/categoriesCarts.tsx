import { Search } from "@/ui/MeinPartials/Search"
import { getAllCategories } from "@/hooks/getAllCategories"
import { Category } from "@/temaplates/templateTypes"
import { CategoriesCart } from "./categoriesCart"
import { MainTitle } from "@/ui/MeinPartials/maint-title"


export const CategoriesCarts = async () => {

    const categories = await getAllCategories()

    return(
        <section className="categoriesCarts container">
            <div className="categoriesCarts__searchBody">
                <Search catalog={false} main={true} openFormState />
            </div>
            <MainTitle styles={{paddingTop: "40px"}} text="Основні категорії" />
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