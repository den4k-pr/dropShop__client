"use client"

import { getAllProducts } from "@/hooks/getAllProducts"
import { useMouseDown } from "@/hooks/useMouseDown"
import { useOutside } from "@/hooks/useOutside"
import { Category, ProductTypes } from "@/temaplates/templateTypes"
import Image from "next/image"
import { useState, useEffect } from "react"

export const Search = ({ catalog, main, openFormState } : { catalog: boolean, main: boolean, openFormState: any }) => {
    
    const [categoryValue, setCategoryValue] = useState({
        name: "Всі категорії",
        categoryId: ""
    })



    const {ref, isShow, setIsShow } = useOutside(false)
    const {refMouse, isShowMouse, setIsShowMouse} = useMouseDown(false)

    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<ProductTypes[]>([])
    const [searchText, setSearchText] = useState('');

    const handleCategoryChange = (name: string, categoryId: string) => {
        setCategoryValue(elementTarget => ({
            ...elementTarget,
            name: name,
            categoryId: categoryId
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4200/api/categories/category");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProducts();

                setProducts(response);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [products]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (categoryValue.categoryId === "" || product.categoryId === categoryValue.categoryId)
    );
    const showProducts = isShowMouse && searchText.trim() !== '' && filteredProducts.length > 0;
    
    return(
        <nav ref={ref} className="serach container">
            {catalog && <button onClick={openFormState} className="navigation__search-filtry"><Image src="/icons/seting.svg" width={25} height={25} alt="filtrs" /></button>}
            {main && <nav className="serach--categories">
                <span onClick={() => setIsShow(!isShow)} className="categories-value">{categoryValue.name}</span>
                <ul style={{opacity: isShow ? "1" : "0", visibility: isShow ? "visible" : "hidden"}} className="categories-list">
                    {categoryValue.name !== "Всі категорії" && <li onClick={() => (handleCategoryChange("Всі категорії", ""), setIsShow(false))} className="categories-list-link">
                        Всі категорії
                    </li>}
                    {categories.filter((category) => category.name !== categoryValue.name).map((category, index) => 
                        <li onClick={() => (handleCategoryChange(category.name, category.id), setIsShow(false))} key={index + 1} className="categories-list-link">
                            {category.name}
                        </li>
                    )}
                </ul>
            </nav>}
            <nav  ref={refMouse} onClick={() => setIsShowMouse(true)} className="serach--section">
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="serach--section-search" 
                    type="text" 
                    placeholder="Знайдіть свій товар" 
                />
                <svg className="serach--section-image" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                {showProducts && <ul className="serach--section__list">
                    {filteredProducts.map((product) =>
                        <li key={product.name} onClick={() => window.location.href = `/product/${product.slug}`} className="serach--section__list-link">
                            {product.name}
                        </li>
                    )}
                </ul>}

            </nav>
        </nav>
    )
}