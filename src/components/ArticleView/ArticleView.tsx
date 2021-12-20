import { Component } from "react";
import ArticleComment from "../Comment/ArticleComment";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import NoArticleView from "../NoArticleView/NoArticleView";
import "./ArticleView.scss";

type ArticleViewProps = {
  post: Post | null;
  comments: Array<Comment>;
};

class ArticleView extends Component<ArticleViewProps> {
  public render() {
    if (this.props.post !== null) {
      return (
        <div className="article-view">
          <div className="article-info">
            <h1>{this.props.post.title}</h1>
            <p>
              {this.props.post.comments_count} comments,{" "}
              {this.props.post.points} points,{" "}
              <a
                className="post-link"
                href={this.props.post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ({this.props.post.domain})
              </a>
            </p>
          </div>
          <hr />
          <div className="comment-section">
            {this.props.comments.map((comment) => {
              return (
                <ArticleComment
                  key={comment.id}
                  comment={comment}
                ></ArticleComment>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <NoArticleView />;
    }
  }
}

export default ArticleView;
