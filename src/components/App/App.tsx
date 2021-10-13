import React, { Component } from "react";
import ArticleView from "../ArticleView/ArticleView";
import SideBar from "../Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import RequestService from "../../RequestService";
import Story from "../../models/Story";
import "./App.scss";

type AppState = {
  topStories: Array<Story>;
  currentStory: Story | null;
};

class App extends Component {
  public state: AppState = {
    topStories: [],
    currentStory: null,
  };

  public async componentDidMount() {
    const result = await RequestService.getTopStories();
    this.setState({ topStories: result });
  }

  public selectStory = (story: Story) => {
    this.setState({ currentStory: story });
  };

  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className="content">
          <SideBar stories={this.state.topStories} onClick={this.selectStory} />
          <ArticleView story={this.state.currentStory} />
        </div>
      </div>
    );
  }
}

export default App;
