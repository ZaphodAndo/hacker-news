import { Component } from "react";
import Post from "../../models/Post";
import "./Link.scss";

type LinkProps = {
  post: Post;
  onClick: (story: Post) => void;
};

class Link extends Component<LinkProps> {
  public state = {
    active: false,
  };

  public viewPost = () => {
    const isActive = this.state.active ? false : true;
    const element = document.getElementsByClassName("active");
    if (element[0] !== undefined) {
      element[0].classList.remove("active");
    }
    this.setState({ active: isActive });
    this.props.onClick(this.props.post);
  };

  public render() {
    return (
      <div
        className={this.state.active ? "link active" : "link"}
        onClick={this.viewPost}
      >
        <h1>{this.props.post.title}</h1>
        <p>
          Posted by {this.props.post.user} {this.props.post.time_ago} |{" "}
          {this.props.post.comments_count} comments | {this.props.post.points}{" "}
          points
        </p>
      </div>
    );
  }
}

export default Link;
