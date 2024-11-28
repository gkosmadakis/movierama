package com.movierama.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movierama.models.Movie;
import com.movierama.repositories.MovieRepository;
import com.movierama.services.MovieService;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }
    
    public List<Movie> findAllMovies() {
    	return movieRepository.findAll();
    }

	@Override
	public void increaseLikes(Long movieId) {
		 movieRepository.increaseLikes(movieId);
	}

	@Override
	public void increaseHates(Long movieId) {
		 movieRepository.increaseHates(movieId);
	}
	
	@Override
	public void decreaseLikes(Long movieId) {
		movieRepository.decreaseLikes(movieId);
	}

	@Override
	public void decreaseHates(Long movieId) {
		movieRepository.decreaseHates(movieId);
	}
	
	@Override
	public List<Movie> filterMovies(Long userId) {
		return movieRepository.filterMovies(userId);
	}

	@Override
	public List<Movie> sortMoviesByLikes() {
		return movieRepository.sortMoviesByLikes();
	}

	@Override
	public List<Movie> sortMoviesByHates() {
		return movieRepository.sortMoviesByHates();
	}

	@Override
	public List<Movie> sortMoviesByDate() {
		return movieRepository.sortMoviesByDate();
	}


}
