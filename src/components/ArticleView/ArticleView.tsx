import { ArticleComment } from "../Comment/ArticleComment";
import { NoArticleView } from "../NoArticleView/NoArticleView";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import "./ArticleView.css";

type ArticleViewProps = {
    post: Post | null;
    comments: Array<Comment> | null;
    onBack: () => void;
};

export function ArticleView({ post, comments, onBack }: ArticleViewProps) {
    if (post === null) {
        return <NoArticleView />;
    }

    return (
        <article className="article-view" aria-labelledby="article-title">
            <div className="article-info">
                <button type="button" className="back-button" onClick={onBack}>
                    <span aria-hidden="true">←</span> Back to stories
                </button>
                <h2 id="article-title" tabIndex={-1}>
                    {post.title}
                </h2>
                <p>
                    {post.comments_count} comments, {post.points} points, (
                    <a
                        className="post-link"
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="visually-hidden">
                            Read article on{" "}
                        </span>
                        {post.domain}
                        <span className="visually-hidden">
                            {" "}
                            (opens in a new tab)
                        </span>
                    </a>
                    )
                </p>
            </div>
            <hr />
            <div className="comment-section">
                {comments === null ? (
                    <p className="comments-message">Loading comments…</p>
                ) : comments.length === 0 ? (
                    <p className="comments-message">No comments yet.</p>
                ) : (
                    <ul className="comment-list">
                        {comments.map((comment) => {
                            return (
                                <ArticleComment
                                    key={comment.id}
                                    comment={comment}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        </article>
    );
}
