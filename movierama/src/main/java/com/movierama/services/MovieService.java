package com.movierama.services;

import com.movierama.models.Movie;

import java.util.List;

public interface MovieService {
    Movie addMovie(Movie movie);
    List<Movie> findAllMovies();
}
