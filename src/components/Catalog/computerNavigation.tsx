"use client"

import {useState} from "react"
import { useNavigationMenu } from "@/hooks/useNavigationMenu"
import { MobileNavigation } from "./MobileNavigationComponent/mobileNavigation"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { priceSort } from "@/arrays/priceSort"
import { Search } from "@/ui/MeinPartials/Search"
import { Category } from "@/temaplates/templateTypes"
import { MainTitle } from "@/ui/MeinPartials/maint-title"


export const ComputerNavigation = (
    {
        categories
    }
    :
    {
        categories: Category[]
    }
) => {

    const route = useParams()

    const [formState, setFormState] = useState({
        category: (categories.filter((category: any) => category.categorySlug == route.categorySlug).map((category) => category.name)),
        subCategory: (route.subCategorySlug == undefined ? "Виберіть підкатегорію" : (categories.map((category) => category.subCategory.filter((subCategory) => subCategory.subCategorySlug == route.subCategorySlug).map((subCategory) => subCategory.name)))),
        transform: "200",
        shadow: "0"
    })

    console.log(formState.subCategory)

    const openFormState = () => {
        document.body.style.overflow = "hidden";

        setFormState(elementTarget => ({
            ...elementTarget,
            transform: "0",
        }))
        setTimeout(() => {
            setFormState(elementTarget => ({
                ...elementTarget,
                shadow: "134",
            }))
        }, 400);
    }
    const closeFormState = () => {
        document.body.style.overflow = "auto";

        setFormState(elementTarget => ({
            ...elementTarget,
            transform: "180",
            shadow: "0",
        }))
    }

    const { ref, isShow, setIsShow } = useNavigationMenu(0)

    const sort = useSearchParams().get("sort");
    const page = useSearchParams().get("page");

    return(
        <section className="navigation container">
            <MainTitle styles={null} text="Виберіть фільтр" />
            <div className="navigation__row">
                <nav className="navigation__row--column">
                    <h3 className="navigation-title">Категорія</h3>
                    <span ref={ref} onClick={() => setIsShow(1)} className="navigation__row--column-category">{formState.category}</span>
                    <ul style={{opacity: isShow == 1 ? "1" : "0", visibility: isShow == 1 ? "visible" : "hidden"}} className="catalog-navigation--list">
                        {categories.map((category) =>
                            <li key={category.id} className="catalog-navigation--list-link">
                                <Link href={`/catalog/${category.categorySlug}?sort=price-high-to-low&page=1`}>
                                    {category.name}
                                </Link>
                            </li>  
                        )}
                    </ul>
                </nav>
                <nav className="navigation__row--column">
                    <h3 className="navigation-title">Під атегорія</h3>
                    <span ref={ref} onClick={() => setIsShow(2)} className="navigation__row--column-category">{formState.subCategory}</span>
                    <ul style={{opacity: isShow == 2 ? "1" : "0", visibility: isShow == 2 ? "visible" : "hidden"}} className="catalog-navigation--list">
                        {categories.filter((category) => category.categorySlug == route.categorySlug).map((category: any) =>
                            category.subCategory.map((subCategory: any) => 
                                <li key={subCategory.id} className="catalog-navigation--list-link">
                                    <Link href={`/catalog/${route.categorySlug}/${subCategory.subCategorySlug}?sort=price-high-to-low&page=1`}>
                                        {subCategory.name}
                                    </Link>
                                </li>  
                            )
                        )}
                    </ul>
                </nav>
                <nav className="navigation__row--column">
                    <h3 className="navigation-title">Ціна</h3>
                    <span ref={ref} onClick={() => setIsShow(3)} className="navigation__row--column-category">
                        {sort !== null ? priceSort.filter((price) => price.slug == sort).map((price) => price.name) : "За замовчуваннаям"}
                    </span>
                    <ul style={{opacity: isShow == 3 ? "1" : "0", visibility: isShow == 3 ? "visible" : "hidden"}} className="catalog-navigation--list">
                        {priceSort.filter((price) => price.slug !== sort).map((price) => 
                            <li key={price.name} className="catalog-navigation--list-link">
                                <Link href={`/catalog/${route.categorySlug}${route.subCategorySlug !== undefined ? `/${route.subCategorySlug}` : ""}?sort=${price.slug}&page=${page}`}>
                                    {price.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <Search catalog={true} main={false} openFormState={openFormState}/>
            <MobileNavigation 
                transform={formState.transform} 
                shadow={formState.shadow} 
                closeFormState={closeFormState} 
            />
        </section>
    )
}