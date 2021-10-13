import React, { Component } from "react";
import Post from "../../models/Post";
import RequestService from "../../RequestService";
import "./ArticleView.scss";

type ArticleViewProps = {
  post: Post | null;
};

class ArticleView extends Component<ArticleViewProps> {
  public async componentDidUpdate() {
    if (this.props.post && this.props.post.comments_count >= 1) {
      const comments = await RequestService.getComments(this.props.post.id);
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
        </div>
      );
    } else {
      return <div>No Story selected (*/ω＼*)</div>;
    }
  }
}

export default ArticleView;
