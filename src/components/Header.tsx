import icon from "/icon.svg"
import './Header.css'

export default function Header() {
    return (
        <header>
            <img src={icon} alt="Icone de robot et carottes" />
            <h1>chef Llama</h1>
        </header>
    )
}