import { useEffect, useState } from "react";
import { ArticleView } from "../ArticleView/ArticleView";
import { SideBar } from "../Sidebar/SideBar";
import { NavBar } from "../NavBar/NavBar";
import { getComments, getTopStories } from "../../api/hackerNews";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import "./App.css";

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
        setCurrentPost(post);
        setComments([]);
    };

    return (
        <div className="App">
            <NavBar />
            <div className="content">
                <SideBar
                    posts={topPosts}
                    activePostId={currentPost?.id}
                    onClick={selectStory}
                />
                <ArticleView post={currentPost} comments={comments} />
            </div>
        </div>
    );
}
