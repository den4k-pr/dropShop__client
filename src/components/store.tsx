"use client"

import { clearSlugs } from "@/app/_redux/StoreSlice";
import { useAppDispatch } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import { getAllProducts } from "@/hooks/getAllProducts";
import { ProductTypes } from "@/temaplates/templateTypes";
import { Product } from "@/ui/MeinPartials/Product";
import { StorePart } from "@/ui/MeinPartials/storePart";
import Link from "next/link";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader"

export const Store = () => {
    const [products, setProducts] = useState<ProductTypes[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const productData = await getAllProducts();
            setProducts(productData);
          } catch (error) {
            console.error("Failed to fetch data: ", error);
          }
        };
    
        fetchData();
      }, []);

    const dispatch = useAppDispatch();

    const HendleClear = () => {
        const shouldClear = window.confirm("Ви впевнені, що хочете видалити історію пошуку?");

        if (shouldClear) {
            dispatch(clearSlugs());
        }
    }

    const slugs = useSelector((state: RootState) => state.slug.slugs);

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

    return(
        <section className="store">
            <div className="container">
                {
                    slugs.length !== 0 ?
                    <button className="store-clear" onClick={HendleClear}>ОЧИСТИТИ</button>
                    :
                    <StorePart title="Ваша історія пошуку порожня. Почніть новий пошук, щоб зберігати свої запити та зручно переглядати їх." />
                }
                <div className="catalog__box-products">

                {slugs.length !== 0 && products.length !== 0 ? products.filter((product) => slugs.includes(product.slug)).map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`}>
                        <figure className="slideProduct">
                            <Product product={product} />  
                        </figure>
                    </Link>
                )) 
                
                : 
                    
                <>{slugs.length !== 0 && loaders}</>

                }
                 
                </div>
            </div>
        </section>
    )
}