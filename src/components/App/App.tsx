import React, { Component } from "react";
import ArticleView from "../ArticleView/ArticleView";
import SideBar from "../Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import RequestService from "../../RequestService";
import Post from "../../models/Post";
import "./App.scss";

type AppState = {
  topPosts: Array<Post>;
  currentPost: Post | null;
};

class App extends Component {
  public state: AppState = {
    topPosts: [],
    currentPost: null,
  };

  public async componentDidMount() {
    const result = await RequestService.getTopStories();
    this.setState({ topPosts: result });
  }

  public selectStory = (story: Post) => {
    this.setState({ currentPost: story });
  };

  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className="content">
          <SideBar posts={this.state.topPosts} onClick={this.selectStory} />
          <ArticleView post={this.state.currentPost} />
        </div>
      </div>
    );
  }
}

export default App;
