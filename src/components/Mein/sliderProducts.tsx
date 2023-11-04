"use client"

import { Product } from "@/ui/MeinPartials/Product";
import Link from "next/link";
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { MainTitle } from "@/ui/MeinPartials/maint-title";

interface ProductSlide{
    name: string;
    price: number;
    slug: string;
    images: string[];
}

export const SliderProducts = ({title, productsArrea} : {title: string, productsArrea: ProductSlide[]} ) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                  slidesToShow: 1,
                }
            },
        ]
    };

    return(
        <section className="sliderProducts container">
            <MainTitle styles={{maxWidth: "500px", margin: "0 auto", paddingBottom: "40px"}} text={title} />
            <nav className="sliderProducts__row">
                <Slider {...settings}>
                {productsArrea && productsArrea.map((product, index) =>
                    
                    <Link key={index} href={`/product/${product.slug}`}> 
                        <motion.div 
                        initial={{ transform: "translateY(30px)", opacity: 0 }}
                        whileInView={{ transform: "translateY(0px)", opacity: 1 }}
                        transition={{ duration: 0.7 }}>
                            <figure key={product.name} className="slideProduct">
                                <Product product={product} />
                            </figure>
                        </motion.div>
                    </Link>
                    
                )}
                </Slider>
            </nav>
        </section>
    )
}