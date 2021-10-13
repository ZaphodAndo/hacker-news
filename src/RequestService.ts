class RequestService {
  private _endpoint = "https://api.hackerwebapp.com/";

  private async _getItem(id: number) {
    const response = await fetch(`${this._endpoint}item/${id}`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  public async getTopStories() {
    const response = await fetch(`${this._endpoint}news`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  public async getComments(id: number) {
    const post = await this._getItem(id);
    const comments = post.comments;
    return comments;
  }
}

export default new RequestService();
