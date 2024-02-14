import Image from "next/image"
import Link from "next/link"


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
    )
}