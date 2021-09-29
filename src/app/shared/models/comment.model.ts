import { Profile } from './profile.model';

export type CommentBase = {
  body: string;
  postId: number;
};

export type CommentRequest = CommentBase & Profile;
export type Comment = CommentRequest & { id: number };
