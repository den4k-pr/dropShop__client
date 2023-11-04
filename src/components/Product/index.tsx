"use client"

import { ProductInfoSlider } from "./productSlider"
import { ProductNavigation } from "./productNavigation"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SliderProducts } from "../Mein/sliderProducts";
import { useAppDispatch } from "@/app/_redux/hooks";
import { addSlug } from "@/app/_redux/StoreSlice";

export const ProductInfo = () => {
    
    const [product, setProducts] = useState<any>([])
    const [sliderProduct, setSliderProduct] = useState<any>([])
    const [shouldFetch, setShouldFetch] = useState(true);
    const router = useParams();
    const { slug } = router;

    useEffect(() => {
        if (slug) {
          fetch(`https://dropshopserver-production-5156.up.railway.app/api/products/by-slug/${slug}`)
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
    }, [slug]);

    useEffect(() => {
        if (product.subCategoryId && shouldFetch) {
          fetch(`https://dropshopserver-production-5156.up.railway.app/api/subCategories/${product.subCategoryId}`)
            .then((response) => response.json())
            .then((result) => {
              setSliderProduct(result);
              setShouldFetch(false); // Устанавливаем shouldFetch в false, чтобы избежать дублирования запроса
            })
            .catch((error) => {
              console.error('Error fetching slider product data:', error);
            });
        }
    }, [product.subCategoryId, shouldFetch]);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(addSlug(product.slug));
    }, [product.slug, dispatch]);

    return(
        <>
          
          <section className="productInfo">
              {product.images ?
              <div className="container" style={{position: "relative"}}>
                  <ProductInfoSlider images={product.images} />
                  <ProductNavigation product={product} />
              </div>
              : <></>}
              <SliderProducts title={`Схожі товари з категорії: ${sliderProduct.name}`} productsArrea={sliderProduct.products} />
          </section>
        </>
    )
}

