import { CategoriesCarts } from "./Categories/categoriesCarts"
import { SliderProducts } from "./sliderProducts"
import { AboutUs } from "./aboutUs"
import { getProductsBuId } from "@/hooks/getProductsBuId"


export const Mein = async () => {

    const productsSliderOne = await getProductsBuId("652242e886162803f02a3128") 
    const productsSliderTwo = await getProductsBuId("652261fa86162803f02a313a") 

    return(
        <div className="main">
            <CategoriesCarts />
            <SliderProducts title={`Новинки ${productsSliderOne.name}`} productsArrea={productsSliderOne.products} />
            <SliderProducts title={`Новинки ${productsSliderTwo.name}`} productsArrea={productsSliderTwo.products} />
            <AboutUs />
        </div>
    )
}