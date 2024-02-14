"use client"

import { clearSoldProducts } from "@/app/_redux/SoldProductsSlice";
import { useAppDispatch } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
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

    return(
        <section className="store">
            <div className="container">
                {items.length !== 0 && <button onClick={HendleClear} className="store-clear" >ОЧИСТИТИ</button>}
                <div className="catalog__box-products">
                {items.length == 0 ?
                <StorePart title="Ваша історія покупок порожня. Почніть нові покупки, щоб зберігати свої запити та зручно переглядати їх." />
                 : 
                 items.map((product, index) => (
                  <Link key={index+1} href={`/product/${product.slug}`}>
                      <figure className="slideProduct">
                          <Product product={product} />  
                      </figure>
                  </Link>
                ))
                }
                </div>
            </div>
        </section>
    )
}