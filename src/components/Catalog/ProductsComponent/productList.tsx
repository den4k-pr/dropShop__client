"use client"

import { useEffect, useState } from 'react';
import { getProductsByCategory, getProductsLength } from "@/hooks/getProductsByCategory";
import { Product } from "@/ui/MeinPartials/Product";
import Link from "next/link";
import { useParams, useSearchParams } from 'next/navigation';
import { getAllCategories } from '@/hooks/getAllCategories';
import { Category, ProductTypes } from '@/temaplates/templateTypes';
import { MainTitle } from '@/ui/MeinPartials/maint-title';
import ContentLoader from 'react-content-loader';

interface ProductsListProps {
    sortByPrice: any;
    categorySlug: any;
    subCategorySlug?: any;
    choosePage: any;
}

export const ProductsList: React.FC<ProductsListProps> = ({
    sortByPrice,
    categorySlug, 
    subCategorySlug,
    choosePage,
}) => {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadProducts, setLoadProducts] = useState(true);
    const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const router = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryType = subCategorySlug === undefined ? "categories" : "subCategories";
                const productData = await getProductsByCategory({
                    category: categoryType,
                    slug: subCategorySlug === undefined ? categorySlug : subCategorySlug,
                    page: Number(choosePage),
                    perPage: 12
                });
                setProducts(productData);

                const data = await getProductsLength({
                    category: categoryType,
                    slug: subCategorySlug === undefined ? categorySlug : subCategorySlug
                });
                const totalPages = Math.ceil(data / 12);
                setTotalPages(totalPages);
                if (productData.length === 0) {
                    setTimeout(() => {
                      setShowNoProductsMessage(true);
                    }, 1000);
                }
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        };

        fetchData();
    }, [sortByPrice, categorySlug, subCategorySlug, choosePage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getAllCategories();
                setCategories(productData);
                setLoadProducts(false)

            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (newPage: number) => {
        const pageUrl = `/catalog/${router.categorySlug}/${router.subCategorySlug === undefined ? "" : router.subCategorySlug + "/"}?sort=${sortByPrice}&page=${newPage}`;
        window.location.href = pageUrl;
    };

    const sort = useSearchParams().get("sort")

    const sortedProducts = [...products].sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
    
        if (sort === 'price-low-to-high') {
          return priceA - priceB;
        } else if(sort === 'price-high-to-low') {
          return priceB - priceA;
        } else {
          return 
        }
    });

    const loaders = Array.from({ length: 6 }).map((_, index) => (
        <ContentLoader 
            key={index}
            speed={2}
            width={290}
            height={459}
            viewBox="0 0 290 459"
            backgroundColor="#fff"
            foregroundColor="#d4d4d4"
        >
            <rect x="20" y="20" rx="5" ry="5" width="250" height="250" /> 
            <rect x="20" y="285" rx="3" ry="3" width="200" height="18" /> 
            <rect x="20" y="313" rx="3" ry="3" width="141" height="22" /> 
            <rect x="20" y="345" rx="3" ry="3" width="167" height="22" />
            <rect x="20" y="402" rx="5" ry="5" width="250" height="39" />
        </ContentLoader>
      ));

    if (loadProducts) {
        return (
            <div className="catalog__box-products">{loaders}</div>
        )
    }

    if (showNoProductsMessage) {
        return (
            <h2 className='catalogMessage'>В даний момент товарів по категорії {categories.filter((category: any) => category.categorySlug == router.categorySlug).map((category) => category.name)} немає в наявності</h2>
        )
    }

    return (
        <>
            <MainTitle
                styles={null}
                text={
                    !router.subCategorySlug
                    ? categories
                        .filter((category) => category.categorySlug === router.categorySlug)
                        .map((category) => category.name)
                    : router.subCategorySlug &&
                        categories
                        .filter((category) => category.categorySlug === router.categorySlug)
                        .flatMap((category) =>
                            category.subCategory
                            .filter(
                                (subCategory: any) =>
                                subCategory.subCategorySlug === router.subCategorySlug
                            )
                            .map((subCategory: any) => subCategory.name)
                        )
                }
                />

            <div className="catalog__box-products">
                {sortedProducts.map((categoryProduct) => (
                    <Link key={categoryProduct.id} href={`/product/${categoryProduct.slug}`}>
                        <figure className="slideProduct">
                            <Product product={categoryProduct} />  
                        </figure>
                    </Link>
                ))}
            </div>
                    
            <nav className="pagination">
                {choosePage !== "1" && (
                    <button onClick={() => handlePageChange(Number(choosePage) - 1)} className="pagination-button pagination-buttonArrow">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 900 900" width="24">
                            <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
                        </svg>
                    </button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${choosePage == index + 1 ? "buttonactive" : ""}`}
                    >
                        {index + 1}
                    </button>
                ))}
                {choosePage !== String(totalPages) && (
                    <button onClick={() => handlePageChange(Number(choosePage) + 1)} className="pagination-button pagination-buttonArrow">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 900 900" width="24">
                            <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
                        </svg>
                    </button>
                )}
            </nav>
        </>
    );
};

