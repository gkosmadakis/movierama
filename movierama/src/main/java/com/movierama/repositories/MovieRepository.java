package com.movierama.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.movierama.models.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByUserId(Long userId);
    
    @Transactional
    @Modifying
    @Query(value = "update Movie SET likes = likes + 1 "
    		+ "WHERE id = ?1 " , nativeQuery = true)
	void increaseLikes(Long movieid);
    
    @Transactional
    @Modifying
    @Query(value = "update Movie SET hates = hates + 1 "
    		+ "WHERE id = ?1 " , nativeQuery = true)
	void increaseHates(Long movieid);
    
    @Transactional
    @Modifying
    @Query(value = "update Movie SET likes = likes - 1 "
    		+ "WHERE id = ?1 " , nativeQuery = true)
	void decreaseLikes(Long movieid);
    
    @Transactional
    @Modifying
    @Query(value = "update Movie SET hates = hates - 1 "
    		+ "WHERE id = ?1 " , nativeQuery = true)
	void decreaseHates(Long movieid);
    
    @Query(value = "SELECT * FROM Movie where user_id = ?1" , nativeQuery = true)
    List<Movie> filterMovies(Long userId);
    
    @Query(value = "SELECT * FROM Movie ORDER BY likes DESC" , nativeQuery = true)
    List<Movie> sortMoviesByLikes();
    
    @Query(value = "SELECT * FROM Movie ORDER BY hates DESC" , nativeQuery = true)
    List<Movie> sortMoviesByHates();
    
    @Query(value = "SELECT * FROM Movie ORDER BY date_added DESC" , nativeQuery = true)
    List<Movie> sortMoviesByDate();
    
}
