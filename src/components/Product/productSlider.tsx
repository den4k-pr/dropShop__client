"use client"
import Image from "next/image"
import { useState } from "react"

export const ProductInfoSlider = ({images} : {images: string[]}) => {

    const [imageIndex, setImageIndex] = useState(0)

    const nextImage = () => {
        const newIndex = (imageIndex + 1) % images.length
        setImageIndex(newIndex)
    }

    const prevImage = () => {
        const newIndex = (imageIndex - 1 + images.length) % images.length
        setImageIndex(newIndex)
    }

    return(
        <div className="productInfo__slider">
            {images && images.length > 0 && (
                <img src={images[imageIndex]} alt="" className="productInfo__slider-image" />
            )}
            <nav className="productInfo__slider--mobileButtons">
                <button onClick={prevImage} className="productInfo__slider--mobileButtons-button"><Image src="/icons/sliderArrow.svg" width={30} height={30} alt="" /></button>
                <button onClick={nextImage} className="productInfo__slider--mobileButtons-button"><Image src="/icons/sliderArrow.svg" width={30} height={30} alt="" /></button>
            </nav>
            <nav className="productInfo__slider--buttons">
                {images && images.map((image, index) =>
                    <button key={image} style={{opacity: imageIndex == index ? "1" : "0.8"}} onClick={() => setImageIndex(index)} className="productInfo__slider--buttons-buttonSlider">
                        <img src={image} alt="" />
                    </button>
                )}
            </nav>
        </div>
    )
}