import { useRef } from "react";

export function useNextThread() {
    const articleRef = useRef<HTMLElement>(null);
    const commentListRef = useRef<HTMLUListElement>(null);
    const scrollingToRef = useRef<Element | null>(null);

    const scrollToNextThread = () => {
        const articleTop = articleRef.current?.getBoundingClientRect().top ?? 0;
        const threads = Array.from(commentListRef.current?.children ?? []);

        // Clicking again mid-scroll should move past the thread being scrolled to
        const scrollingTo = scrollingToRef.current;
        const start = scrollingTo ? threads.indexOf(scrollingTo) + 1 : 0;

        const nextThread = threads.slice(start).find((thread) => {
            const margin = parseFloat(getComputedStyle(thread).scrollMarginTop);
            return thread.getBoundingClientRect().top - margin > articleTop + 1;
        });

        if (nextThread) {
            scrollingToRef.current = nextThread;
            nextThread.scrollIntoView({ block: "start" });
        }
    };

    const onScrollEnd = () => {
        scrollingToRef.current = null;
    };

    return { articleRef, commentListRef, scrollToNextThread, onScrollEnd };
}
