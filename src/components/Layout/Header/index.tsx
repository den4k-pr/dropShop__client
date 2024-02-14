import { SupportSystem } from "../supportSystem"
import { HeaderTop } from "./HeaderTop"

export const Header = () => {
    return(
        <header className="header">
            <HeaderTop />
            <SupportSystem />
        </header>
    )
}