import { Timestamp } from "../Timestamp/Timestamp";
import type { Post } from "../../models/Post";
import "./Link.css";

type LinkProps = {
    post: Post;
    isActive: boolean;
    onClick: (story: Post) => void;
};

export function Link({ post, isActive, onClick }: LinkProps) {
    return (
        <li className={isActive ? "link active" : "link"}>
            <h2>
                <button
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => onClick(post)}
                >
                    {post.title}
                </button>
            </h2>
            <p>
                Posted by {post.user} <Timestamp time={post.time} />
            </p>
        </li>
    );
}
