import { ArticleComment } from "../Comment/ArticleComment";
import { NoArticleView } from "../NoArticleView/NoArticleView";
import type { Post } from "../../models/Post";
import type { Comment } from "../../models/Comment";
import "./ArticleView.css";

type ArticleViewProps = {
    post: Post | null;
    comments: Array<Comment>;
};

export function ArticleView({ post, comments }: ArticleViewProps) {
    if (post === null) {
        return <NoArticleView />;
    }

    return (
        <main className="article-view">
            <div className="article-info">
                <h2>{post.title}</h2>
                <p>
                    {post.comments_count} comments, {post.points} points,{" "}
                    <a
                        className="post-link"
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ({post.domain})
                    </a>
                </p>
            </div>
            <hr />
            <div className="comment-section">
                {comments.map((comment) => {
                    return (
                        <ArticleComment key={comment.id} comment={comment} />
                    );
                })}
            </div>
        </main>
    );
}
