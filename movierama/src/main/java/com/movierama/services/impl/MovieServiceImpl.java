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
}
