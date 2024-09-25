import { User } from './user.model';

export interface Movie {
  id: number;
  title: string;
  description: string;
  user: User; // Reference to the user who submitted the movie
  dateAdded: Date; 
  likesCount: number; 
  hatesCount: number; 
}
