package com.movierama.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movierama.models.Movie;
import com.movierama.services.MovieService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    @Autowired
    private MovieService movieService;
    

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.findAllMovies());
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }
    
    @GetMapping("/filter/{userId}")
    public ResponseEntity<List<Movie>> filterMovies(@PathVariable Long userId) {
        return ResponseEntity.ok(movieService.filterMovies(userId));
    }
    
    @GetMapping("/sort/likes")
    public ResponseEntity<List<Movie>> sortMoviesByLikes() {
        return ResponseEntity.ok(movieService.sortMoviesByLikes());
    }
    
    @GetMapping("/sort/hates")
    public ResponseEntity<List<Movie>> sortMoviesByHates() {
        return ResponseEntity.ok(movieService.sortMoviesByHates());
    }
    
    @GetMapping("/sort/date")
    public ResponseEntity<List<Movie>> sortMoviesByDate() {
        return ResponseEntity.ok(movieService.sortMoviesByDate());
    }
    
    
}
