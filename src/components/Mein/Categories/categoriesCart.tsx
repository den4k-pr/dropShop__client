"use client"

import Link from "next/link"
import { motion } from 'framer-motion';

export const CategoriesCart = ({ 
    href,
    images,
    title 
} : { 
    href: string,
    images: string[]
    title: string 
}) => {
    return(
        <motion.div 
            initial={{ transform: "scale(0.9)", opacity: 0 }}
            whileInView={{ transform: "scale(1)", opacity: 1 }}
            transition={{ duration: 0.7 }}>
            <Link href={href} className="categoriesCarts__categories-categoryCart">
                <figure className="categoryCart">
                    <div className="categoryCart-images">
                        {images.map(image =>
                            <div key={image} className="categoryCart-images-image">
                                <img src={image} alt="" />
                            </div>
                        )}
                    </div>
                    <figcaption className="categoryCart-content">
                        <h3 className="categoryCart-content-name">{title}</h3>
                    </figcaption>
                </figure>
            </Link>
        </motion.div>
    )
}

        