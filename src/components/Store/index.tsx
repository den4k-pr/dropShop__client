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

    return(
        <section className="store">
            <div className="container">
                {slugs.length !== 0 && <button className="store-clear" onClick={HendleClear}>ОЧИСТИТИ</button>}
                <div className="catalog__box-products">
                {slugs.length == 0 ?
                <StorePart title="Ваша історія пошуку порожня. Почніть новий пошук, щоб зберігати свої запити та зручно переглядати їх." />
                 : 
                products.filter((product) => slugs.includes(product.slug)).map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`}>
                        <figure className="slideProduct">
                            <Product product={product} />  
                        </figure>
                    </Link>
                ))}
                </div>
            </div>
        </section>
    )
}