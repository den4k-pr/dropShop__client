import { Category } from "@/temaplates/templateTypes";
import { MainTitle } from "@/ui/MeinPartials/maint-title";
import axios from "axios";
import { useEffect, useState } from "react";


export const CaregoryChooose = ({categorySlug, setCategoriesData, setIsShow, isShow} : {categorySlug: string, setCategoriesData: any, setIsShow: any, isShow: number}) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:4200/api/categories/category';

        axios.get(apiUrl)
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error('Помилка при отриманні даних з API:', error);
        });
    }, []);

    const hendleCatregory = (eventName: string, eventSlug: string) => {
        setCategoriesData((categoriesData: any) => ({
            ...categoriesData,
            category: eventName,
            categorySlug: eventSlug
        }))

        setTimeout(() => {
            setIsShow(0)
        }, 1000)
    }
    
    const hendleSubCatregory = (eventName: string, eventSlug: string) => {
        setCategoriesData((categoriesData: any) => ({
            ...categoriesData,
            subCategory: eventName,
            subCategorySlug: eventSlug
        }))

        setTimeout(() => {
            setIsShow(0)
        }, 1000)
    }    

    return(
        <>
            <div className="categoryChoose__header">
                <button onClick={() => setIsShow(0)} className="mobNavigation-close">✖</button>
                <MainTitle styles={null} text={isShow == 1 ? "Оберіть категорію" : "Оберіть під категорію"} />
            </div>
            <nav className="categoryChoose__list">
                {isShow == 1 ? categories.map((category, index) => 
                    <button key={index+1} onClick={() => (hendleCatregory(category.name, category.categorySlug))} className="categoryChoose__list--category">
                        <img className="categoryChoose__list--category-image" src={category.images[0]} alt="" />
                        <h3 className="categoryChoose__list--category-title">{category.name}</h3>
                    </button>
                ) 
                : 
                categories.filter((category) => category.categorySlug == categorySlug).map((cateory) => cateory.subCategory.map((subCat) =>  
                    <button key={subCat.name} onClick={() => (hendleSubCatregory(subCat.name, subCat.subCategorySlug))} className="categoryChoose__list--category">
                        <h3 className="categoryChoose__list--category-title">{subCat.name}</h3>
                    </button>
                )) 
                }
            </nav>
        </>
    )
}