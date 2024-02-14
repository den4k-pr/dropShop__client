"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

export const AboutUs = () => {
    return (
        <section className="about container">
            <div className="container">
                <h2 className="about-logo">Raftel</h2>
                <p className="about-description">
                    &ldquo;RetailBloom&rdquo; - ваш інтернет-магазин, де кожна покупка розцвітає в яскравому віртуальному світі шопінгу. Ми пропонуємо широкий асортимент товарів від модного одягу до аксесуарів та електроніки й товарів для дому. Наша мета - зробити ваші покупки приємними та зручними, завдяки інтуїтивному інтерфейсу сайту та оперативній доставці. Поглибіться в шопінговому досвіді з RetailBloom та дозвольте своїм покупкам процвітати з нами!
                </p>
                <span className="about-subtitle">Приєднайся до нас:</span>
                <motion.div 
                    initial={{ transform: "translateY(30px)", opacity: 0 }}
                    whileInView={{ transform: "translateY(0px)", opacity: 1 }}
                    transition={{ duration: 0.7 }}>
                <nav className="about-images">
                    <Link href="https://www.tiktok.com/@_._raftel_._?_t=8gKzOwjz5qo&_r=1">
                        <Image src="/icons/tiktok.svg" width={45} height={45} alt="" />
                    </Link>
                    <Link href="https://instagram.com/_.r.a.f.t.e.l._?igshid=NGVhN2U2NjQ0Yg==">
                        <Image src="/icons/instagram.svg" width={40} height={40} alt="" />
                    </Link>
                </nav>
                </motion.div>
            </div>
        </section>
    );
};
