import { Component } from "react";
import ArticleView from "../ArticleView/ArticleView";
import SideBar from "../Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import RequestService from "../../services/RequestService";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import "./App.scss";

type AppState = {
  topPosts: Array<Post>;
  currentPost: Post | null;
  comments: Array<Comment>;
};

class App extends Component {
  public state: AppState = {
    topPosts: [],
    currentPost: null,
    comments: [],
  };

  public async componentDidMount() {
    this.checkTheme();
    const result = await RequestService.getTopStories();
    this.setState({ topPosts: result });
  }

  public checkTheme = () => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      localStorage.setItem("theme", theme);
    }
    document.documentElement.setAttribute("data-theme", theme);
  };

  public selectStory = async (post: Post) => {
    this.setState({ currentPost: post });
    if (post.comments_count >= 1) {
      const comments = await RequestService.getComments(post.id);
      this.setState({ comments: comments });
    } else {
      this.setState({ comments: [] });
    }
  };

  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className="content">
          <SideBar posts={this.state.topPosts} onClick={this.selectStory} />
          <ArticleView
            post={this.state.currentPost}
            comments={this.state.comments}
          />
        </div>
      </div>
    );
  }
}

export default App;
