"use client"

import { useNavigationMenu } from "@/hooks/useNavigationMenu"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CaregoryChooose } from "./caregoryChooose"
import { MainTitle } from "@/ui/MeinPartials/maint-title"

export const MobileNavigation = (
    { 
        transform,
        shadow, 
        closeFormState
    } 
    : 
    { 
        transform: string, 
        shadow: string, 
        closeFormState: any
    }) => {
  
    const { ref, isShow, setIsShow } = useNavigationMenu(0)

    const [categoriesData, setCategoriesData] = useState({
        category: "Вибери категорію",
        categorySlug: "",
        subCategory: "Вибери під категорію",
        subCategorySlug: "",
        priceFilter: ""
    })

    const ClearFilter = () => {
        setCategoriesData((categoriesData: any) => ({
            ...categoriesData,
            category: "Вибери категорію",
            categorySlug: "",
            subCategory: "Вибери під категорію",
            subCategorySlug: "",
            priceFilter: ""
        }))

    }   

    const PriceFilter = (e: any) => {
        setCategoriesData((categoriesData: any) => ({
            ...categoriesData,
            priceFilter: e
        }))
    }

    const router = useParams()

    return (
        <section 
            ref={ref} 
            style={{
                overflowY: isShow == 0 ? "scroll" : "initial",
                transform: `translateY(-${transform}%)`,
                boxShadow: `inset 0 -${shadow}px 94px -83px #6a6a6a`
            }} 
            className="mobNavigation"
        >
            <section className="categoryChoose" style={{transform: isShow !== 0 ? "translatey(0)" : "translatey(-100%)"}}>
                <CaregoryChooose categorySlug={categoriesData.categorySlug} setCategoriesData={setCategoriesData} isShow={isShow} setIsShow={setIsShow} />
            </section>
            <button onClick={closeFormState} className="mobNavigation-close">✖</button>
            <div className="mobNavigation__top">
                <MainTitle styles={{textAlign: "center", margin: "0 auto"}} text="Фільтри" />
                {categoriesData.categorySlug == "" 
                &&
                categoriesData.subCategorySlug == ""
                &&
                categoriesData.priceFilter == "" || <button onClick={() => ClearFilter()} className="mobNavigation__top-clear">Очистити Фільтри</button>}
            </div>
            
            <form onSubmit={(e) => {
                    e.preventDefault(); // Предотвращаем перезагрузку страницы
                    window.location.href = `/catalog/${categoriesData.categorySlug == "" ? router.categorySlug : categoriesData.categorySlug}/${categoriesData.subCategorySlug}${categoriesData.priceFilter !== "?sort=&page=1" ? `?sort=${categoriesData.priceFilter}&page=1` : ""}`;
                }} className="mobNavigation__form">
                <label ref={ref} className="mobNavigation__form-label">
                    <span className="mobNavigation__form-label-title">Категорія</span>
                    <button onClick={(e) => (setIsShow(1), e.preventDefault())} className="mobNavigation__form-label-button">{categoriesData.category}</button>
                </label>
                <label ref={ref} className="mobNavigation__form-label">
                    <span className="mobNavigation__form-label-title">Під категорія</span>
                    <button 
                        style={{
                            opacity: categoriesData.categorySlug == "" ? "0.6" : "1",
                            cursor: categoriesData.categorySlug == "" ? "not-allowed" : "pointer"}} 
                        onClick={(e) => (categoriesData.categorySlug == "" ? setIsShow(0) : setIsShow(2), e.preventDefault())} 
                        className="mobNavigation__form-label-button"
                    >
                    {categoriesData.subCategory}
                    </button>
                </label>
                <label onClick={() => PriceFilter("")} className="mobNavigation__form-labelRadio">
                    <span className="mobNavigation__form-label-title">По замовчуваню</span>
                    <div className={`mobNavigation__form-labelRadio-button ${categoriesData.priceFilter == "" ? "buttonChek" : ""}`}></div>
                </label>
                <label onClick={() => PriceFilter("price-low-to-high")} className="mobNavigation__form-labelRadio">
                    <span className="mobNavigation__form-label-title">По зростанню</span>
                    <div className={`mobNavigation__form-labelRadio-button ${categoriesData.priceFilter == "price-low-to-high" ? "buttonChek" : ""}`}></div>
                </label>
                <label onClick={() => PriceFilter("price-high-to-low")} className="mobNavigation__form-labelRadio">
                    <span className="mobNavigation__form-label-title">По спаданню</span>
                    <div className={`mobNavigation__form-labelRadio-button ${categoriesData.priceFilter == "price-high-to-low" ? "buttonChek" : ""}`}></div>
                </label>
                <button  
                    style={{opacity: 
                        categoriesData.categorySlug == "" 
                        && 
                        categoriesData.subCategorySlug == ""
                        &&
                        categoriesData.priceFilter == "" 
                        ? 
                        "0.6" 
                        : 
                        "1", 
                        cursor: 
                        categoriesData.categorySlug == "" 
                        && 
                        categoriesData.subCategorySlug == ""
                        &&
                        categoriesData.priceFilter == ""
                        ? "not-allowed" 
                        : "pointer"}} 
                    className="mobNavigation__form-button"
                >
                Переглянути товари
                </button>
            </form>
        </section>
    )
}