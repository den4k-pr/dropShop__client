'use client'

import { Category } from "@/temaplates/templateTypes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export const Footer = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4200/api/categories/category");
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.data;
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return(
        <footer className="footer">
            <div className="footer__row">
                <div className="footer__row--column">
                {categories.map((category, index) =>
                    <ul key={index} className="footer__row--column-categories">
                        <h3 className="footer__row--column-title">{category.name}</h3>
                            {category.subCategory.map((subCategory) =>  
                            <li key={subCategory.name}>
                                <Link className="footer__row--column-categories-link" href={`/catalog/${category.categorySlug}/${subCategory.subCategorySlug}?sort=price-high-to-low&page=1`}>
                                    {subCategory.name}
                                </Link>
                            </li>
                            )}
                    </ul>
                    )}
                </div>

                <div className="footer__row--column">
                    <nav className="footer__row--column-contacts">
                        <h3 className="footer__row--column-title">Контакти</h3>
                        <Link href="" className="contact">
                            <h4 className="contact-title">Телефон</h4>
                            <nav className="contact--box">
                                <span className="contact--box-index">1.</span>
                                <p className="contact--box-link">+380956700502</p>
                            </nav>
                        </Link>
                        <Link href="" className="contact">
                            <h4 className="contact-title">Email</h4>
                            <nav className="contact--box">
                                <span className="contact--box-index">2.</span>
                                <p className="contact--box-link">yakovden44k@gmail.com</p>
                            </nav>
                        </Link>
                        <div className="contact">
                            <h4 className="contact-title">Соціальні мережі</h4>
                            <nav className="contact--icons">
                                <span className="contact--icons-index">3.</span>
                                <Link className="contact--icons-link" href="https://www.tiktok.com/@_._raftel_._?_t=8gKzOwjz5qo&_r=1">
                                    <Image src="/icons/tiktok.png" width={30} height={30} alt="tiktok" />
                                </Link>
                                <Link className="contact--icons-link" href="https://instagram.com/_.r.a.f.t.e.l._?igshid=NGVhN2U2NjQ0Yg==">
                                    <Image src="/icons/instagram.png" width={30} height={30} alt="instagram" />
                                </Link>
                            </nav>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="footer--bottom">
                <p className="footer--bottom-text">Copyright © 2023 RetailBloom | All Rights Reserved.</p>
                <button className="footer--bottom-up" onClick={scrollToTop}></button>
            </div>
        </footer>
    )
}