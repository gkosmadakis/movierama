package com.movierama.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.movierama.models.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{

	@Query(value = "select * from Vote v WHERE v.movie_id = ?1 "
			+ "AND v.user_id = ?2", nativeQuery = true)
	Vote findVoteByMovieAndUser(Long movieid, Long userId);
	
	@Query(value = "select * from Vote v WHERE v.movie_id = ?1 "
			+ "AND v.vote_type = 'LIKE' ", nativeQuery = true)
	List<Vote> findLikesBymovieId(Long movieid);
	
	@Query(value = "select * from Vote v WHERE v.movie_id = ?1 "
			+ "AND v.vote_type = 'HATE' ", nativeQuery = true)
	List<Vote> findHatesBymovieId(Long movieid);
}
