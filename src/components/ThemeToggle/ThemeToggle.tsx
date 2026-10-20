import { useLayoutEffect, useState } from "react";
import { DarkIcon } from "../Icons/DarkIcon";
import { LightIcon } from "../Icons/LightIcon";
import "./ThemeToggle.css";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const nextTheme = theme === "light" ? "dark" : "light";

    return (
        <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${nextTheme} theme`}
            onClick={() => setTheme(nextTheme)}
        >
            {theme === "light" ? (
                <DarkIcon className="icon" />
            ) : (
                <LightIcon className="icon" />
            )}
        </button>
    );
}
