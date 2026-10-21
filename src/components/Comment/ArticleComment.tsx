import { sanitiseHtml } from "../../utils/sanitiseHtml";
import { Timestamp } from "../Timestamp/Timestamp";
import type { Comment } from "../../models/Comment";
import "./ArticleComment.css";

type ArticleCommentProps = {
    comment: Comment;
    className?: string;
};

export function ArticleComment({ comment, className }: ArticleCommentProps) {
    const borderStyle = "level-" + comment.level + " comment-data";

    return (
        <li className={className ? className + " comment" : "comment"}>
            <div className={borderStyle}>
                <p className="comment-meta">
                    {comment.user} <Timestamp time={comment.time} />
                </p>
                <div
                    className="comment-content"
                    dangerouslySetInnerHTML={{
                        __html: sanitiseHtml(comment.content),
                    }}
                />
            </div>
            {comment.comments.length > 0 && (
                <ul className="comments">
                    {comment.comments.map((child) => {
                        return (
                            <ArticleComment
                                key={child.id}
                                comment={child}
                                className="child-comment"
                            />
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
