export type CommentBase = {
  body: string;
  postId: number;
};

export type Comment = CommentBase & {
  id: number;
  name: string;
  email: string;
};
