export type User = {
  id: string;
  displayImg: string;
  name: string;
  tagline?: string;
};

export type Comment = {
  post: string;
  id: string;
  user: User;
  commentText: string;
  commentLikes: Array<string>;
  repliedTo?: string;
  replies?: Array<Comment>;
};

export type Post = {
  id: string;
  user: User;
  createdAt: number;
  content: string;
  likes: Array<string>;
  img?: string;
  comments: Array<Comment>;
};
