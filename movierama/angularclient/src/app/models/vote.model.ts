import {Movie} from './movie.model';
import { User } from './user.model';

export interface Vote {
  id: number;
  movieId: number;
  userId: number;
  voteType: 'like' | 'hate';
}
