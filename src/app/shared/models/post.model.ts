import { Comment } from './comment.model';
import { User } from './user.model';

export type PostResponse = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  user?: User;
  comments?: Comment[];
};
