import Image from "next/image"
import FireTV from "../../../public/products/fireTV.jpg"

export const  ProductsStore = () => {
    const name = "Fire TV Stick - wersja międzynarodowa z pilotem Alexa Voice Remote | Urządzenie do streamingu HD"

    const shortText = name.split(' ').slice(0, 6).join(' ');

    return(
        <figure className="productStore">
            <Image
                src={FireTV}
                width={100}
                height={140}
                style={{maxWidth: "100%", height: "auto", width: "100%", padding: "20px"}}
                placeholder="blur"
                alt="product"
                priority
            />
            <figcaption className="productStore--content">
                <h3 className="productStore--content-name">{shortText}{name.split("").length > 6 ? "..." : "" }</h3>
            </figcaption>
        </figure>
    )
}