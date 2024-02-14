"use client"

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react"


export const Register = ({isSmallScreen, authSections, setAuthSections} : {isSmallScreen: boolean, authSections: string, setAuthSections: Dispatch<SetStateAction<string>>}) => {

    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const router = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        console.log(inputs);
    
        setLoading(true);
    
        axios
        .post(`http://localhost:4200/api/users`, inputs)
        .then(async (res) => {
            console.log(res);
                    
            const signInRes = await signIn("credentials", {
                // @ts-ignore
                email: inputs.email,
                // @ts-ignore
                password: inputs.password,
                redirect: false,
            });
            
            window.location.replace("/");
        })
        .catch(error => {
            console.log(error);
            if(axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    setMessage("Користувач з такою електронною адресою вже існує");
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                  } else {
                    setMessage("Сталася помилка. Попробуйте пізніше");
                  }
            }
        })
        .finally(() => {
            setInputs({});
            setLoading(false);
        });
    };
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({ ...prevState, [name]: value }));
    };

    return(
        <div style={{
                flex: authSections == "register" ? "52%" : "48%",
                minHeight: isSmallScreen ? authSections == "register" ? "90vh" : "25vh" : "90vh",
                transition: isSmallScreen ? "" : ".2s"
            }} 
            className="signin__nav"
        >

            <form className="signin__nav--form" onSubmit={handleSubmit}>
                <h2 className="signin__nav-title">Ви тут вперше?</h2>
                {authSections == "register" ? 
                <>
                    <label className="signin__nav--form-label">Пошта</label>
                    <input className="signin__nav--form-input" type="email" name="email" required onChange={handleChange}/>
                    <fieldset className="signin__nav--form-top">
                        <div>
                            <label className="signin__nav--form-label">Імя</label>
                            <input className="signin__nav--form-input form-top-inputWidth" type="text" name="name" required onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="signin__nav--form-label">Фамілія</label>
                            <input className="signin__nav--form-input form-top-inputWidth" type="text" name="lastName" required onChange={handleChange}/>
                        </div>
                    </fieldset>
                    <label className="signin__nav--form-label">Пароль</label>
                    <input className="signin__nav--form-input" type="password" name="password" required onChange={handleChange}/>
                </>
                : <></>}
                <button onClick={() => setAuthSections("register")} className="signin__nav--form-button" type="submit">{loading ? "Завантаження..." : "Зареєструватися"}</button>
                <span style={{textAlign: "center", paddingTop: "10px"}}>{message}</span>
            </form>
            {authSections == "register" ? 
            <div className="signin__nav--propose">
                <h3 className="signin__nav--propose-title">Створіть акауни і отримаєте</h3>
                <section className="signin__nav--propose-section">
                    <Image src="/icons/time.svg" width={25} height={25} alt="" />
                    <span>Легкий доступ до історії покупок</span>
                </section>
            </div>
            : <></>}
        </div>
    )
}