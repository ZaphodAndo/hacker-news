type Comment = {
  by: string;
  id: number;
  kids: Array<number>;
  comments: Array<Comment>;
  parent: number;
  text: string;
  time: number;
  type: string;
};

export default Comment;
