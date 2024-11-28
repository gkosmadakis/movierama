package com.movierama.services;

import com.movierama.models.Movie;

import java.util.List;

public interface MovieService {
    Movie addMovie(Movie movie);
    List<Movie> findAllMovies();
    void increaseLikes(Long movieId);
    void increaseHates(Long movieId);
    void decreaseLikes(Long movieId);
    void decreaseHates(Long movieId);
    List<Movie> filterMovies(Long userId);
    List<Movie> sortMoviesByLikes();
    List<Movie> sortMoviesByHates();
    List<Movie> sortMoviesByDate();
}
