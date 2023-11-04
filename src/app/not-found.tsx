"use client"
import { useRouter } from "next/navigation";

const PageError = () => {

    const router = useRouter();

    const goToHomePage = () => {
        router.push('/');
    };

    return (
        <section className="error">
            <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <p className="error-message">
                Вибачте, але сторінку, яку ви шукали, не знайдено. Можливо, ви ввели неправильний URL або сторінка була видалена.
            </p>
            <div className="link-container">
            <button onClick={goToHomePage} className="more-link">
                Перейти на головну сторінку
            </button>
            </div>
        </section>
    )
}

export default PageError