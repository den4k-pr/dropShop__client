"use client"

import { clearSoldProducts } from "@/app/_redux/SoldProductsSlice";
import { useAppDispatch } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import ContentLoader from "react-content-loader"
import { Product } from "@/ui/MeinPartials/Product";
import { StorePart } from "@/ui/MeinPartials/storePart";
import Link from "next/link";
import { useSelector } from "react-redux";

export const SoldProducts = () => {

    const items = useSelector((state: RootState) => state.sold.items);

    const dispatch = useAppDispatch();

    const HendleClear = () => {
      const shouldClear = window.confirm("Ви впевнені, що хочете видалити історію покупок?");

      if (shouldClear) {
          dispatch(clearSoldProducts());
      }
    }

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
                {items.length !== 0 ? 
                    <button onClick={HendleClear} className="store-clear" >ОЧИСТИТИ</button>
                    :
                    <StorePart title="Ваша історія покупок порожня. Почніть нові покупки, щоб зберігати свої запити та зручно переглядати їх." />
                }
                <div className="catalog__box-products">
                {items.length !== 0 && items.length !== 0 ? items.map((product: any, index: any) => (
                  <Link key={index+1} href={`/product/${product.slug}`}>
                      <figure className="slideProduct">
                          <Product product={product} />  
                      </figure>
                  </Link>
                ))
                    :

                    <>{items.length !== 0 && loaders}</>
                }
                </div>
            </div>
        </section>
    )
}