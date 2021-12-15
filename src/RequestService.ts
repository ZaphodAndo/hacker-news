class RequestService {
  private _endpoint = "https://api.hackerwebapp.com/";

  private async _getItem(id: number) {
    return await fetch(`${this._endpoint}item/${id}`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  public async getTopStories() {
    return await fetch(`${this._endpoint}news`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  public async getComments(id: number) {
    const post = await this._getItem(id);
    return post.comments;
  }
}

export default new RequestService();
