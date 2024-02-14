"use client"

import { supportSystem } from "@/arrays/supportSystem"
import { useOutside } from "@/hooks/useOutside"
import Image from "next/image"
import emailjs from 'emailjs-com';
import { useState, useEffect } from "react"

export const SupportSystem = () => {

    const [chooseSection, setChooseSection] = useState(0);
    const [formSend, setFormSend] = useState(false);
    const { ref, isShow, setIsShow } = useOutside(false)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaccess, setIsSaccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setIsSubmitting(true);
    
        const templateParams = {
          name: name,
          email: email,
          message: message,
        };
    
        try {
          await emailjs.send(
            'service_ugc7dcw',
            'template_2ueaqn1',
            templateParams,
            'B3uHEg9VYxDRxtTJq',
          );
          console.log('Email sent successfully!');
          setIsSaccess(true);
        } catch (error) {
          console.error('Error sending email:', error);
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
    
        setIsSubmitting(false);
    
        // Очистити поля форми після відправлення
        setTimeout(() => {
          setIsSaccess(false);
          setIsError(false);
          setFormSend(false);
          setIsShow(false);

          setChooseSection(0);

        }, 3000);
    
        setName('');
        setEmail('');
        setMessage('');
    };

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [hendleActiveForm, setHendleActiveForm] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 700);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if(isShow == false) {
            setHendleActiveForm(false)
        }
    });

    const HendleActiveForm = (bool: boolean) => {
        if(isSmallScreen) {
            setHendleActiveForm(bool)
        }
    }

    return(
        <section onClick={() => setIsShow(true)} ref={ref} className="supportSystem">
            <button className="supportSystem-button">
                <Image src="/icons/chat.svg" width={35} height={35} alt="chat" />
            </button>
            <nav className="supportSystem__chat" style={{bottom: hendleActiveForm ? "20px" : "15%",opacity: isShow ? "1" : "0", visibility: isShow ? "visible" : "hidden" }} >
                {chooseSection == 0  && <section className="supportSystem__chat--inner">
                    {!formSend && <h3 className="supportSystem__chat--inner-title">Привіт! <span>Як ми можемо вам допомогти?</span></h3>}
                    {!formSend && <div className="supportSystem__chat--inner-sections">
                        {supportSystem.map(system => 
                            <nav key={system.id} onClick={() => setChooseSection(system.id)} className="section">
                                <span className="section-name">{system.name}</span>
                                <Image src="/icons/arrowLink2.svg" width={20} height={20} alt="" />
                            </nav>
                        )}
                    </div>}

                    <div style={{marginTop: formSend ? "0px" : "20px"}} className="supportSystem__chat--inner-sections">
                        <nav className="sectionSend">
                            {isError && <div className="formLoader">
                                <h3 className="formLoader-message">Сталася помилка, попробуйте пізніше</h3>
                            </div>}
                            {isSaccess && <div className="formLoader">
                                <h3 className="formLoader-message">Повідомлення успішно відправлено!</h3>
                            </div>}
                            {isSubmitting && <div className="formLoader">
                                <div className="formLoader-spinear"></div>
                            </div>}
                            {formSend && 
                            <form onSubmit={handleSubmit} className="sectionSend--form">
                                <button className="sectionSend--form-back" onClick={(e) => (setFormSend(false), e.preventDefault())}><Image src="/icons/arrowLink2.svg" width={30} height={30} alt="" /></button>
                                <h3 className="sectionSend--form-title">Що у вас трапилось?</h3>
                                <label className="sectionSend--form-label">Як вас звати?</label>
                                <input onClick={() => HendleActiveForm(true)} name="name" onChange={(e) => setName(e.target.value)} className="sectionSend--form-input" type="text" />
                                <label className="sectionSend--form-label">Вкажіть email</label>
                                <input onClick={() => HendleActiveForm(true)} name="email" onChange={(e) => setEmail(e.target.value)} className="sectionSend--form-input" type="email" />
                                <label className="sectionSend--form-label">Опишіть проблему</label>
                                <textarea onClick={() => HendleActiveForm(true)} name="message" onChange={(e) => setMessage(e.target.value)} className="sectionSend--form-textarea" />
                                <button className="sectionSend--form-button">Надіслати</button>
                            </form>}
                            {!formSend && <div onClick={() => setFormSend(true)} className="sectionSend-row">
                                <span className="sectionSend-row-name">Напишіть нам</span>
                                <Image src="/icons/send.png" width={12} height={12} alt="" />
                            </div>}
                        </nav>
                    </div>
                </section>}
                {supportSystem.filter((system) => system.id == chooseSection).map(system => 
                <section key={system.id} className="supportSystem__chat--section">
                    <button onClick={() => setChooseSection(0)} className="supportSystem__chat--section-back"><Image src="/icons/arrowLink2.svg" width={40} height={40} alt="" /></button>
                    <h3 className="supportSystem__chat--section-title">{system.title}</h3>
                    <p className="supportSystem__chat--section-description">{system.description}</p>
                </section>
                )}
            </nav>
        </section>
    )
}