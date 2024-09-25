export interface Vote {
  movieId: number;
  userId: number;
  type: 'like' | 'hate';
}
