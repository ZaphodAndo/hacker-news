import Comment from "./models/Comment";

class RequestService {
  private _endpoint = "https://hacker-news.firebaseio.com/v0/";
  private _topStoryIds: Array<number>;
  private _comments: Array<Comment>;

  constructor() {
    this._topStoryIds = [];
    this._comments = [];
  }

  private async _getTopStorieIds() {
    const response = await fetch(`${this._endpoint}topstories.json`).then(
      (response) => response.json()
    );
    return response;
  }

  private async _getItem(id: number) {
    const response = await fetch(`${this._endpoint}item/${id}.json`).then(
      (response) => response.json()
    );
    return response;
  }

  private async _getTopStoryData() {
    const topStoryIds = this._topStoryIds.slice(0, 20);
    let topStories = [];
    // Need to remove the 20 we extract out.

    for (let i = 0; i < topStoryIds.length; i++) {
      const item = await this._getItem(topStoryIds[i]);
      topStories.push(item);
    }
    return topStories;
  }

  public async getTopStories() {
    this._topStoryIds = await this._getTopStorieIds();
    const stories = await this._getTopStoryData();
    console.log(stories);
    return stories;
  }

  // jank be here
  public async getComments(ids: Array<number>) {
    for (let i = 0; i < ids.length; i++) {
      const value = await this._getItem(ids[i]);
      console.log("chain: ", i);
      console.log(value);

      let hasParent = false;

      for (let i = 0; i < this._comments.length; i++) {
        if (this._comments[i].id === value.parent) {
          if (this._comments[i].comments === undefined) {
            const comments: Array<Comment> = [];
            this._comments[i].comments = comments;
          }
          this._comments[i].comments.push(value);
          hasParent = true;
          break;
        } else {
          hasParent = false;
        }
      }

      if (hasParent === false) {
        this._comments.push(value);
      }

      if (value.kids) {
        this.getComments(value.kids);
      }
    }
  }
}

export default new RequestService();
