import { useEffect, useEffectEvent, useState } from "react";

type Shortcuts = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: Shortcuts) {
    const [helpOpen, setHelpOpen] = useState(false);
    const [enabled, setEnabled] = useState(
        () => localStorage.getItem("shortcuts") !== "off",
    );

    useEffect(() => {
        localStorage.setItem("shortcuts", enabled ? "on" : "off");
    }, [enabled]);

    const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
        // Works even when shortcuts are off, so they can always be turned back on
        if ((event.ctrlKey || event.metaKey) && event.key === "/") {
            event.preventDefault();
            setHelpOpen((open) => !open);
            return;
        }

        if (
            !enabled ||
            helpOpen ||
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        const action = shortcuts[event.key.toLowerCase()];
        if (action) {
            event.preventDefault();
            action();
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => onKeyDown(event);
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return { helpOpen, setHelpOpen, enabled, setEnabled };
}
