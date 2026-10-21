import { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { DarkIcon } from "../Icons/DarkIcon";
import { HelpIcon } from "../Icons/HelpIcon";
import { LightIcon } from "../Icons/LightIcon";
import { SettingsIcon } from "../Icons/SettingsIcon";
import { isMac } from "../../utils/platform";
import "./SettingsMenu.css";

type SettingsMenuProps = {
    onShowShortcuts: () => void;
};

export function SettingsMenu({ onShowShortcuts }: SettingsMenuProps) {
    const { theme, toggleTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const showShortcuts = () => {
        menuRef.current?.hidePopover();
        buttonRef.current?.focus();
        onShowShortcuts();
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className="icon-button"
                aria-label="Settings"
                popoverTarget="settings-menu"
            >
                <SettingsIcon className="icon" />
            </button>
            <div
                ref={menuRef}
                id="settings-menu"
                className="settings-menu"
                popover="auto"
            >
                <button type="button" onClick={toggleTheme}>
                    {theme === "light" ? (
                        <DarkIcon className="menu-icon" />
                    ) : (
                        <LightIcon className="menu-icon" />
                    )}
                    {theme === "light" ? "Dark theme" : "Light theme"}
                </button>
                <button
                    type="button"
                    aria-keyshortcuts="Control+/ Meta+/"
                    onClick={showShortcuts}
                >
                    <HelpIcon className="menu-icon" />
                    Keyboard shortcuts
                    <kbd>{isMac ? "⌘" : "Ctrl"} /</kbd>
                </button>
            </div>
        </>
    );
}
