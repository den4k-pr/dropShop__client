"use client"

import { addItem, clearCart, removeItem, selectTotalPrice, updateColor, updateQuantity, updateSize } from "@/app/_redux/CartSlice";
import { addItems } from "@/app/_redux/SoldProductsSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import getStipePromise from "@/configs/stripe";
import { getAllSubCategories } from "@/hooks/getAllSubCategories";
import { SubCategory } from "@/temaplates/templateTypes";
import { MainTitle } from "@/ui/MeinPartials/maint-title";
import Link from "next/link";
import React, { useEffect, useState } from "react"
export const Cart = () => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([])

    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    const dispatch = useAppDispatch()

    const handleRemoveFromCart = (itemId: number) => {
        dispatch(removeItem(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllSubCategories();
                setSubCategories(response);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const totalPrice = useAppSelector(selectTotalPrice);

    const handleAddToCart = (item: any, image: string, color: string, size: string) => {
        dispatch(addItem({...item, image: image, selectedColor: color, size: size}));
    };

    const handleCheckout = async () => {
        const stripe = await getStipePromise();
        const response = await fetch("/api/stripe-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify(cartItems),
        });
    
        const data = await response.json();
        if (data.session) {
          stripe?.redirectToCheckout({ sessionId: data.session.id });

          dispatch(addItems(cartItems));
        }
      };

    return(
        <section className="cart">
            <div className="cart__items">
                <div className="cart__items--top">
                    <h2 className="main--title">Корзина покупок</h2>
                    <span onClick={handleClearCart} className="cart__items--top-close">Очистити корзину</span>
                </div>
                <nav className="cart__items--products">
                    {cartItems.length === 0 ? (
                        <div className="cart__items--products-error">
                            <p>Корзина порожня!</p>
                            <button onClick={() => window.location.href ="/clothes?sort=price-high-to-low&page=1"}>переглянути товари</button>
                        </div>
                    ) : (
                    cartItems.map((item: any, index: any) => 
                        <React.Fragment key={index}>
                            <figure className="productItem">
                                <div className="productItem-image">
                                <img src={item.image} alt="" />
                                </div>
                                <figcaption className="productItem--info">
                                    <h3 className="productItem--info-name">{item.name}</h3>
                                    <span className="productItem--info-price">{item.price - (item.price * (item.priceDrop / 100))}грн</span>
                                    <span className="productItem--info-availability">В наявності</span>
                                    <span className="productItem--info-category">{item.categoryName}</span>
                                    <div className="productItem--info-elements">
                                        <div className="productItem--info-elements-colors">
                                            <div className="item-color" style={{backgroundColor: item.selectedColor}}></div>
                                            <nav className="item-colors">
                                                {item.colors.map((color: string) =>
                                                    <div key={color} onClick={(e) => dispatch(updateColor({ id: item.id, color: color }))} className="items-item-color" style={{backgroundColor: color}}></div>
                                                )}
                                            </nav>
                                        </div>
                                        <div className="productItem--info-elements-sizes">
                                            <div className="item-size">{item.size}</div>
                                            <nav className="item-sizes">
                                                {item.sizes.map((size: string) =>
                                                    <div key={size} onClick={(e) => dispatch(updateSize({ id: item.id, size: size }))} className="items-item-size">{size}</div>
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <nav className="productItem--info-navigation">
                                <button className="productItem--info-navigation-qty">Кількість: 
                                    <input 
                                        defaultValue={item.quantity} 
                                        max={10}
                                        min={1}
                                        type="number" 
                                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                        style={{
                                            backgroundColor: "transparent", 
                                            width: "35px",
                                            paddingLeft: "5px"
                                        }} 
                                    />
                                </button>
                                <span style={{color: "#d7d7d7"}}>|</span>
                                <button onClick={() => handleRemoveFromCart(item.id)} className="productItem--info-navigation-delete">Видалити</button>
                            </nav>
                        </React.Fragment>
                    ))}
                </nav>
                <p className="totalPrice">В сумі ({cartItems.length} {cartItems.length >= 5 ? "товарів" : "товари"}): <span className="totalPrice-prices">грн{totalPrice}</span></p>
            </div>
            <div className="cart__bar-top">
                <p className="totalPrice">В сумі ({cartItems.length} {cartItems.length >= 5 ? "товарів" : "товари"}): <span className="totalPrice-prices">грн{totalPrice}</span></p>
                <button className="cart__bar-top-button" onClick={handleCheckout}>Перейти до оформлення</button>
            </div>
            <div className="cart__bar-bottom">
                <h3 className="cart__bar-bottom-title">Рекомендавані довари</h3>
                <nav className="cart__bar-bottom-list">
                {subCategories && (subCategories)[0]?.products?.map((item, index) => 
                    <Link href={`/product/${item.slug}`} key={index+1}>
                        <figure className="cart__bar-bottom-list--product">
                            <img className="cart__bar-bottom-list--product-image" src={item.images[0]} alt="" />
                            <figcaption className="cart__bar-bottom-list--product-info">
                                <h3 className="cart__bar-bottom-list--product-info-name">{item.name}</h3>
                                <span className="cart__bar-bottom-list--product-info-price">{item.price}грн</span>
                                <button 
                                    className="cart__bar-bottom-list--product-info-button" 
                                    onClick={(e) => (handleAddToCart(
                                        item, 
                                        item.images[0], 
                                        item.colors[0], 
                                        item.sizes[0],
                                    ),
                                    e.preventDefault())}>Додати</button>
                            </figcaption>
                        </figure>
                    </Link>
                )}
                </nav>
            </div>
        </section>
    )
}//