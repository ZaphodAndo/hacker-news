import DOMPurify from "dompurify";

// Hacker News comments only ever contain these tags
const config = {
    ALLOWED_TAGS: ["p", "a", "i", "pre", "code"],
    ALLOWED_ATTR: ["href"],
};

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
    }
});

export function sanitiseHtml(html: string) {
    return DOMPurify.sanitize(html, config);
}
