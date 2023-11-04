

export const StorePart = ({title} : {title: string}) => {
    return(
        <nav className="store--back">
            <h3 className="store--back-title">{title}</h3>
            <button onClick={() => window.location.href = "/"} className="store--back-button">Перейти в каталог</button>
        </nav>
    )
}