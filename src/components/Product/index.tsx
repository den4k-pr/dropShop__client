"use client"

import { ProductInfoSlider } from "./productSlider";
import { ProductNavigation } from "./productNavigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SliderProducts } from "../Mein/sliderProducts";
import { useAppDispatch } from "@/app/_redux/hooks";
import { addSlug } from "@/app/_redux/StoreSlice";
import axios from 'axios';

export const ProductInfo = () => {
    
    const [product, setProducts] = useState<any>([]);
    const [sliderProduct, setSliderProduct] = useState<any>([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const router = useParams();
    const { slug } = router;

    useEffect(() => {
        if (slug) {
          axios.get(`http://localhost:4200/api/products/by-slug/${slug}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
    }, [slug]);

    useEffect(() => {
        if (product.subCategoryId && shouldFetch) {
          axios.get(`http://localhost:4200/api/subCategories/${product.subCategoryId}`)
            .then((response) => {
              setSliderProduct(response.data);
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
    );
};
