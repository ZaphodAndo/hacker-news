type Comment = {
  comments: Array<Comment>;
  content: string;
  id: number;
  level: number;
  time: number;
  time_ago: number;
  user: string;
};

export default Comment;
