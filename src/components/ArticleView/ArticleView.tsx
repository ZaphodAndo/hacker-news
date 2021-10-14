import React, { Component } from "react";
import ArticleComment from "../Comment/ArticleComment";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import RequestService from "../../RequestService";
import "./ArticleView.scss";

type ArticleViewProps = {
  post: Post | null;
};

type ArticleViewState = {
  comments: Array<Comment>;
};

class ArticleView extends Component<ArticleViewProps> {
  public state: ArticleViewState = {
    comments: [],
  };

  public async componentDidUpdate() {
    if (this.props.post && this.props.post.comments_count >= 1) {
      const comments = await RequestService.getComments(this.props.post.id);
      this.setState({ comments: comments });
    }
  }

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
            {this.state.comments.map((comment) => {
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
