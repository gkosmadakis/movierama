package com.movierama.services;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.movierama.models.Vote;

public interface VoteService {
	Vote voteMovie(Vote vote);
	Vote findById(Long id);
	Vote removeLike(Vote vote);
	Vote removeHate(Vote vote);
	Vote findVotesByUser(Vote vote);
	Vote findVotesByMovieAndUser(Long movieId, Long userId);
    List<Vote> findLikesByMovieId(Long movieId);
    List<Vote> findHatesByMovieId(Long movieId);
    void delete(Long id) throws NotFoundException;
}
