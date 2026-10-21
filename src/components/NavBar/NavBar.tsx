import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import "./NavBar.css";

type NavBarProps = {
    onShowShortcuts: () => void;
};

export function NavBar({ onShowShortcuts }: NavBarProps) {
    return (
        <header className="nav-bar">
            <h1>Hacker News</h1>
            <div className="nav-actions">
                <SettingsMenu onShowShortcuts={onShowShortcuts} />
            </div>
        </header>
    );
}
