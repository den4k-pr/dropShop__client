import { addItem } from "@/app/_redux/CartSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import { motion } from 'framer-motion';

export const Product = ({ product } : any) => {

    const dispatch = useAppDispatch();

    const handleAddToCart = (item: any) => {
        dispatch(addItem(item));
    };

    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    const isItemInCart = cartItems.some((item) => item.id === product.id);

    return(
        <motion.div 
                initial={{ transform: "translateY(20px) scale(0.95)", opacity: 0 }}
                whileInView={{ transform: "translateY(0px) scale(1)", opacity: 1 }}
                transition={{ duration: 0.7 }}>
            {product.images && product.images.length > 0 && (
            <div className="slideProduct-image">
                <img src={product.images[0] as string} alt="" />
            </div>
            )}
            <figcaption className="slideProduct--info">
                <span className="slideProduct--info-category">{product.categoryName}</span>
                <h3 className="slideProduct--info-name">{product.name}</h3>
                <span className="slideProduct--info-price">
                    {product.priceDrop !== 0 && <s style={{paddingRight: "5px"}}>{product.price}грн</s>}
                    {(Number(product.price) - (Number(product.price) * (product.priceDrop / 100))).toFixed(2)}грн
                </span>
                <button disabled={isItemInCart} className="slideProduct--info-button" onClick={(e) => (handleAddToCart(product), e.preventDefault())}>
                    {isItemInCart ? "Додано" : "Додати у кошик"}
                </button>
            </figcaption>
        </motion.div>
    )
}