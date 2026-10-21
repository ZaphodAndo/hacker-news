import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import "./NextThreadButton.css";

type NextThreadButtonProps = {
    onClick: () => void;
};

export function NextThreadButton({ onClick }: NextThreadButtonProps) {
    return (
        <button
            type="button"
            className="next-thread-button"
            aria-label="Next comment thread"
            title="Next comment thread"
            onClick={onClick}
        >
            <ChevronDownIcon className="next-thread-icon" />
        </button>
    );
}
