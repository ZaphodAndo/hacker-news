import { HelpIcon } from "../Icons/HelpIcon";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import "./NavBar.css";

type NavBarProps = {
    onShowShortcuts: () => void;
};

export function NavBar({ onShowShortcuts }: NavBarProps) {
    return (
        <header className="nav-bar">
            <h1>Hacker News</h1>
            <div className="nav-actions">
                <button
                    type="button"
                    className="icon-button"
                    aria-label="Keyboard shortcuts"
                    aria-keyshortcuts="Control+/ Meta+/"
                    onClick={onShowShortcuts}
                >
                    <HelpIcon className="icon" />
                </button>
                <ThemeToggle />
            </div>
        </header>
    );
}
