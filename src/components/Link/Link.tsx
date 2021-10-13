import { Component } from "react";
import moment from "moment";
import Story from "../../models/Story";
import "./Link.scss";

type LinkProps = {
  story: Story;
  onClick: (story: Story) => void;
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
    this.props.onClick(this.props.story);
  };

  public render() {
    const time = moment(this.props.story.time * 1000).fromNow();
    return (
      <div
        className={this.state.active ? "link active" : "link"}
        onClick={this.viewPost}
      >
        <h1>{this.props.story.title}</h1>
        <p>
          Posted by {this.props.story.by} {time} |{" "}
          {this.props.story.descendants} comments | {this.props.story.score}{" "}
          points
        </p>
      </div>
    );
  }
}

export default Link;
