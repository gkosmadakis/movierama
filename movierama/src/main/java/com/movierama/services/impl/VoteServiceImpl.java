package com.movierama.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.movierama.models.Vote;
import com.movierama.repositories.VoteRepository;
import com.movierama.services.VoteService;

@Service
public class VoteServiceImpl implements VoteService {

	@Autowired
	private VoteRepository voteRepository;

	@Override
	public Vote findVotesByUser(Vote vote) {
		return null;
	}

	@Override
	public Vote findVotesByMovieAndUser(Long movieId, Long userId) {
		return voteRepository.findVoteByMovieAndUser(movieId, userId);
	}

	@Override
	public List<Vote> findLikesByMovieId(Long movieId) {
		return voteRepository.findLikesBymovieId(movieId);
	}

	@Override
	public List<Vote> findHatesByMovieId(Long movieId) {
		return voteRepository.findHatesBymovieId(movieId);
	}
	
	@Override
	public Vote voteMovie(Vote vote) {
		return voteRepository.save(vote);
	}

	@Override
	public Vote removeLike(Vote vote) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Vote removeHate(Vote vote) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Vote findById(Long id) {
		return voteRepository.getReferenceById(id);
	}

	@Override
	public void delete(Long id) throws NotFoundException {
		Vote toDelete = findById(id);
		if (toDelete == null)
			throw new NotFoundException();
		voteRepository.delete(toDelete);
		
	}

	
	
}
