import { useEffect, useEffectEvent, useState } from "react";
import { flushSync } from "react-dom";
import { ArticleView } from "../ArticleView/ArticleView";
import { SideBar } from "../Sidebar/SideBar";
import { NavBar } from "../NavBar/NavBar";
import { ShortcutsHelp } from "../ShortcutsHelp/ShortcutsHelp";
import { getComments, getTopStories } from "../../api/hackerNews";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import "./App.css";

// No story is open on a fresh page load, so if the page was reloaded while one
// was open, step back past its history entry.
if (history.state?.storyOpen) {
    history.back();
}

export function App() {
    const [topPosts, setTopPosts] = useState<Array<Post> | null>(null);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Array<Comment> | null>(null);

    useEffect(() => {
        getTopStories().then(setTopPosts);
    }, []);

    useEffect(() => {
        document.title = currentPost
            ? `${currentPost.title} | Hacker News`
            : "Hacker News";
    }, [currentPost]);

    useEffect(() => {
        if (currentPost === null || currentPost.comments_count < 1) {
            return;
        }

        // Drop the response if another story is selected before it arrives
        let ignore = false;
        getComments(currentPost.id).then((comments) => {
            if (!ignore) {
                setComments(comments);
            }
        });

        return () => {
            ignore = true;
        };
    }, [currentPost]);

    const selectStory = (post: Post) => {
        if (post.id === currentPost?.id) {
            return;
        }

        flushSync(() => {
            setCurrentPost(post);
            setComments(post.comments_count > 0 ? null : []);
        });

        const listHidden = !document
            .getElementById(`story-${post.id}`)
            ?.checkVisibility();

        if (listHidden) {
            if (!history.state?.storyOpen) {
                history.pushState({ storyOpen: true }, "");
            }
            focusArticle();
        }
    };

    const focusArticle = () => {
        document.getElementById("article-title")?.focus();
    };

    const selectNearbyStory = (offset: number) => {
        if (!topPosts?.length) {
            return;
        }

        const index = topPosts.findIndex((post) => post.id === currentPost?.id);
        const next = Math.min(Math.max(index + offset, 0), topPosts.length - 1);
        selectStory(topPosts[next]);

        const storyButton = document.getElementById(
            `story-${topPosts[next].id}`,
        );
        if (storyButton?.checkVisibility()) {
            storyButton.focus();
        }
    };

    const closeStory = () => {
        const postId = currentPost?.id;
        flushSync(() => setCurrentPost(null));
        document.getElementById(`story-${postId}`)?.focus();
    };

    // Browser back (including the phone back gesture) closes the story
    const onPopState = useEffectEvent(() => closeStory());
    useEffect(() => {
        const handlePopState = () => onPopState();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const goBack = () => {
        if (history.state?.storyOpen) {
            history.back();
        } else {
            closeStory();
        }
    };

    const shortcuts = useKeyboardShortcuts({
        j: () => selectNearbyStory(1),
        k: () => selectNearbyStory(-1),
        a: focusArticle,
        escape: () => currentPost && goBack(),
    });

    // Read out by screen readers whenever it changes
    let status = "";
    if (topPosts === null) {
        status = "Loading stories…";
    } else if (currentPost !== null && comments === null) {
        status = "Loading comments…";
    } else if (currentPost !== null) {
        status = comments?.length ? "Comments loaded" : "No comments yet";
    }

    return (
        <div className="App">
            {currentPost && (
                <button
                    type="button"
                    className="skip-link"
                    onClick={() =>
                        document.getElementById("article-title")?.focus()
                    }
                >
                    Skip to article
                </button>
            )}
            <p role="status" className="visually-hidden">
                {status}
            </p>
            <NavBar onShowShortcuts={() => shortcuts.setHelpOpen(true)} />
            <ShortcutsHelp
                open={shortcuts.helpOpen}
                onClose={() => shortcuts.setHelpOpen(false)}
                enabled={shortcuts.enabled}
                onEnabledChange={shortcuts.setEnabled}
            />
            <main className={currentPost ? "content article-open" : "content"}>
                <SideBar
                    posts={topPosts}
                    activePostId={currentPost?.id}
                    onClick={selectStory}
                />
                <ArticleView
                    post={currentPost}
                    comments={comments}
                    onBack={goBack}
                />
            </main>
        </div>
    );
}
