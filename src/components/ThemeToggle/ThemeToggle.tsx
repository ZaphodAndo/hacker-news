import { useState } from "react";
import { DarkIcon } from "../Icons/DarkIcon";
import { LightIcon } from "../Icons/LightIcon";
import "./ThemeToggle.css";

const getInitialTheme = () => {
    return localStorage.getItem("theme");
};

export function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme());

    const switchTheme = () => {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        currentTheme === "light"
            ? (currentTheme = "dark")
            : (currentTheme = "light");
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
        setTheme(currentTheme);
    };

    if (theme === "light") {
        return <DarkIcon className="icon" onClick={switchTheme} />;
    } else {
        return <LightIcon className="icon" onClick={switchTheme} />;
    }
}
