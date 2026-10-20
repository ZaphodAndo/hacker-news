import { sanitiseHtml } from "../../utils/sanitiseHtml";
import type { Comment } from "../../models/Comment";
import "./ArticleComment.css";

type ArticleCommentProps = {
    comment: Comment;
    className?: string;
};

export function ArticleComment({ comment, className }: ArticleCommentProps) {
    const borderStyle = "level-" + comment.level + " comment-data";

    return (
        <div className={className ? className + " comment" : "comment"}>
            <div className={borderStyle}>
                <p className="comment-meta">
                    {comment.user} {comment.time_ago}
                </p>
                <div
                    className="comment-content"
                    dangerouslySetInnerHTML={{
                        __html: sanitiseHtml(comment.content),
                    }}
                />
            </div>
            <div className="comments">
                {comment.comments.map((child) => {
                    return (
                        <ArticleComment
                            key={child.id}
                            comment={child}
                            className="child-comment"
                        />
                    );
                })}
            </div>
        </div>
    );
}
