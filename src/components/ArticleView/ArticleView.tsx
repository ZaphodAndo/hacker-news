import React, { Component } from "react";
import ArticleComment from "../Comment/ArticleComment";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
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
          <div className="title">
            <h1>{this.props.post.title}</h1>
            <p>({this.props.post.domain})</p>
          </div>
          <p>
            Posted by {this.props.post.user} {this.props.post.time_ago} |{" "}
            {this.props.post.comments_count} comments | {this.props.post.points}{" "}
            points
          </p>
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
      return <div>No Story selected (*/ω＼*)</div>;
    }
  }
}

export default ArticleView;
