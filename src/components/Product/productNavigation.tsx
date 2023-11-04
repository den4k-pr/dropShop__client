"use client"

import { addItem } from "@/app/_redux/CartSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import { useEffect, useState } from "react";

export const ProductNavigation = ({product} : any) => {

    const [isFixed, setIsFixed] = useState(false);
    const [isSesion, setIsSesion] = useState(true);
    const [changeColor, setChangeColor] = useState(product.colors && product.colors[0]);
    const [changeSize, setChangeSize] = useState(product.sizes && product.sizes[0]);

    useEffect(() => {
        const handleScroll = () => {
          if (window.innerWidth > 991) {
            if (window.scrollY >= 140) {
              setIsFixed(true);
            } else {
              setIsFixed(false);
            }
          } else {
            setIsSesion(false)
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const dispatch = useAppDispatch();

    const handleAddToCart = (item: any) => {
        dispatch(addItem({...item, image: product.images[0], selectedColor: changeColor, size: changeSize}));
    };

    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    const isItemInCart = cartItems.some((item: any) => item.id === product.id);

    return(
        <div className="productInfo__navigation" style={{transform: isSesion ? "translate(150%, 0px)" : "translate(0%, 0px)", position: isSesion ? isFixed ? "absolute" : "fixed" : "initial", bottom: isFixed ? "55px" : ""}}>
            <div className="productInfo__navigation--top">
                <p className="productInfo__navigation--top-category">{product.categoryName}</p>
                <h3 className="productInfo__navigation--top-name">{product.name}</h3>
                <div className="priceBox">
                    <span className="priceBox-price">{product.price - (product.price * (product.priceDrop / 100))} uah</span>
                    {product.priceDrop !== 0 && 
                    <>
                        <s className="priceBox-priceDropText">{product.price} uah</s>
                        <p className="priceBox-priceDrop">-{product.priceDrop}%</p>
                    </>}
                </div>
            </div>
            <div className="productInfo__navigation--bottom">
                <span className="productInfo__navigation--bottom--colors">
                    <span className="bottom-title">Кольора</span>
                    <nav className="colors--buttons">
                        {product.colors && product.colors.map((color: any) => 
                            <button key={color} className={`colors--buttons-buttonColor ${color == changeColor ? "activeColor" : ""}`} onClick={() => setChangeColor(color)}><div style={{backgroundColor: color}}></div></button>
                        )}
                    </nav>
                </span>
                <span className="productInfo__navigation--bottom--size">
                    <span className="bottom-title">Розміри</span>
                    <nav className="size--buttons">
                        {product.sizes && product.sizes.length > 0 && product.sizes.map((size: string) =>
                            <button key={size} onClick={() => setChangeSize(size)} className={`size--buttons-buttonSize ${size == changeSize ? "activeSize" : ""}`}>{size}</button>
                        )}
                    </nav>
                </span>
                <button disabled={isItemInCart} onClick={() => handleAddToCart(product)} className="productInfo__button">{isItemInCart ? "Додано" : "Додати у кошик"}</button>
            </div>
        </div>
    )
}