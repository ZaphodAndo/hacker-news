import React, { Component } from "react";
import moment from "moment";
import Story from "../../models/Story";
import RequestService from "../../RequestService";
import "./ArticleView.scss";

type ArticleViewProps = {
  story: Story | null;
};

class ArticleView extends Component<ArticleViewProps> {
  public componentDidUpdate() {
    if (this.props.story?.kids !== undefined) {
      RequestService.getComments(this.props.story.kids);
    }
  }

  public render() {
    if (this.props.story !== null) {
      const time = moment(this.props.story.time * 1000).fromNow();

      const url = new URL(this.props.story.url);
      const domain = url.hostname.replace("www.", "");

      return (
        <div className="article-view">
          <div className="title">
            <h1>{this.props.story.title}</h1>
            <p>({domain})</p>
          </div>
          <p>
            Posted by {this.props.story.by} {time} |{" "}
            {this.props.story.descendants} comments | {this.props.story.score}{" "}
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
