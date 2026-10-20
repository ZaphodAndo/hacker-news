import { useEffect, useEffectEvent, useState } from "react";
import { flushSync } from "react-dom";
import { ArticleView } from "../ArticleView/ArticleView";
import { SideBar } from "../Sidebar/SideBar";
import { NavBar } from "../NavBar/NavBar";
import { getComments, getTopStories } from "../../api/hackerNews";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import "./App.css";

// No story is open on a fresh page load, so if the page was reloaded while one
// was open, step back past its history entry.
if (history.state?.storyOpen) {
    history.back();
}

export function App() {
    const [topPosts, setTopPosts] = useState<Array<Post>>([]);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Array<Comment>>([]);

    useEffect(() => {
        getTopStories().then(setTopPosts);
    }, []);

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
            setComments([]);
        });

        const listHidden = !document
            .getElementById(`story-${post.id}`)
            ?.checkVisibility();

        if (listHidden) {
            history.pushState({ storyOpen: true }, "");
            document.getElementById("article-title")?.focus();
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

    return (
        <div className="App">
            <NavBar />
            <div className={currentPost ? "content article-open" : "content"}>
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
            </div>
        </div>
    );
}
