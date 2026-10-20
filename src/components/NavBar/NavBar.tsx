import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import "./NavBar.css";

export function NavBar() {
    return (
        <div className="nav-bar">
            <p>Hacker News</p>
            <ThemeToggle />
        </div>
    );
}
