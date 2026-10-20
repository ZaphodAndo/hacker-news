import { Component } from "react";
import type Comment from "../../models/Comment";
import "./ArticleComment.scss";

type ArticleCommentProps = {
  comment: Comment;
  className?: string;
};

class ArticleComment extends Component<ArticleCommentProps> {
  public createMarkup = () => {
    return { __html: this.props.comment.content };
  };

  public render() {
    const style = this.props.className
      ? this.props.className + " comment"
      : "comment";

    const borderStyle = "level-" + this.props.comment.level + " comment-data";

    return (
      <div className={style}>
        <div className={borderStyle}>
          <p className="comment-meta">
            {this.props.comment.user} {this.props.comment.time_ago}
          </p>
          <div
            className="comment-content"
            dangerouslySetInnerHTML={this.createMarkup()}
          />
        </div>
        <div className="comments">
          {this.props.comment.comments.map((comment) => {
            return (
              <ArticleComment
                key={comment.id}
                comment={comment}
                className="child-comment"
              ></ArticleComment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticleComment;
