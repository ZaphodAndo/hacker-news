import { Link } from "../Link/Link";
import type { Post } from "../../models/Post";
import "./SideBar.css";

type SideBarProps = {
    posts: Array<Post>;
    activePostId?: number;
    onClick: (post: Post) => void;
};

export function SideBar({ posts, activePostId, onClick }: SideBarProps) {
    return (
        <nav className="side-bar" aria-label="Top stories">
            <ul className="side-bar-links">
                {posts.map((post) => {
                    return (
                        <Link
                            key={post.id}
                            post={post}
                            isActive={post.id === activePostId}
                            onClick={onClick}
                        />
                    );
                })}
            </ul>
        </nav>
    );
}
