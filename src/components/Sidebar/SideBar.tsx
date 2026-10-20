import { Component } from "react";
import type Post from "../../models/Post";
import Link from "../Link/Link";
import "./SideBar.scss";

type SideBarProps = {
  posts: Array<Post>;
  onClick: (post: Post) => void;
};

class SideBar extends Component<SideBarProps> {
  public render() {
    return (
      <div className="side-bar">
        <div className="side-bar-links">
          {this.props.posts.map((post) => {
            return (
              <Link key={post.id} post={post} onClick={this.props.onClick} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SideBar;
