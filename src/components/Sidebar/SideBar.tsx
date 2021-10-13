import React, { Component } from "react";
import Story from "../../models/Story";
import Link from "../Link/Link";
import "./SideBar.scss";

type SideBarProps = {
  stories: Array<Story>;
  onClick: (story: Story) => void;
};

class SideBar extends Component<SideBarProps> {
  public render() {
    return (
      <div className="side-bar">
        {this.props.stories.map((story) => {
          return (
            <Link key={story.id} story={story} onClick={this.props.onClick} />
          );
        })}
      </div>
    );
  }
}

export default SideBar;
