import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import "./NavBar.css";

export function NavBar() {
    return (
        <header className="nav-bar">
            <h1>Hacker News</h1>
            <ThemeToggle />
        </header>
    );
}
