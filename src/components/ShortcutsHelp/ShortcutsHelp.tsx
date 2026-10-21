import { useEffect, useRef } from "react";
import { isMac } from "../../utils/platform";
import "./ShortcutsHelp.css";

type ShortcutsHelpProps = {
    open: boolean;
    onClose: () => void;
    enabled: boolean;
    onEnabledChange: (enabled: boolean) => void;
};

const shortcuts = [
    { key: "J", action: "Open the next story" },
    { key: "K", action: "Open the previous story" },
    { key: "A", action: "Jump to the open article" },
    { key: "Esc", action: "Close the story" },
    { key: `${isMac ? "⌘" : "Ctrl"} + /`, action: "Show or hide this help" },
];

export function ShortcutsHelp({
    open,
    onClose,
    enabled,
    onEnabledChange,
}: ShortcutsHelpProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open && !dialog?.open) {
            dialog?.showModal();
        } else if (!open && dialog?.open) {
            dialog.close();
        }
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className="shortcuts-help"
            aria-labelledby="shortcuts-help-title"
            onCancel={onClose}
            onClose={onClose}
        >
            <h2 id="shortcuts-help-title">Keyboard shortcuts</h2>
            <label className="shortcuts-toggle">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(event) => onEnabledChange(event.target.checked)}
                />
                Enable keyboard shortcuts
            </label>
            <dl>
                {shortcuts.map(({ key, action }) => (
                    <div key={key}>
                        <dt>
                            <kbd>{key}</kbd>
                        </dt>
                        <dd>{action}</dd>
                    </div>
                ))}
            </dl>
            <form method="dialog">
                <button className="close-button">Close</button>
            </form>
        </dialog>
    );
}
