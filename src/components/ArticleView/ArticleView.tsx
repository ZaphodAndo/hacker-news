import { useImperativeHandle, type Ref } from "react";
import { ArticleComment } from "../Comment/ArticleComment";
import { NextThreadButton } from "../NextThreadButton/NextThreadButton";
import { NoArticleView } from "../NoArticleView/NoArticleView";
import { useNextThread } from "../../hooks/useNextThread";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import type { ArticleViewHandle } from "./ArticleViewHandle";
import "./ArticleView.css";

type ArticleViewProps = {
    ref?: Ref<ArticleViewHandle>;
    post: Post | null;
    comments: Array<Comment> | null;
    onBack: () => void;
};

export function ArticleView({ ref, post, comments, onBack }: ArticleViewProps) {
    const { articleRef, commentListRef, scrollToNextThread, onScrollEnd } =
        useNextThread();

    useImperativeHandle(ref, () => ({ scrollToNextThread }));

    if (post === null) {
        return <NoArticleView />;
    }

    return (
        <article
            ref={articleRef}
            className="article-view"
            aria-labelledby="article-title"
            onScrollEnd={onScrollEnd}
        >
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
                    <ul ref={commentListRef} className="comment-list">
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
            {!!comments?.length && (
                <NextThreadButton onClick={scrollToNextThread} />
            )}
        </article>
    );
}
