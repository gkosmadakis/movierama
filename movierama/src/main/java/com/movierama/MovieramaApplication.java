package com.movierama;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.movierama.models.Movie;
import com.movierama.models.User;
import com.movierama.repositories.MovieRepository;
import com.movierama.repositories.UserRepository;

@SpringBootApplication
public class MovieramaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieramaApplication.class, args);
	}
	
	 @Bean
	    public CommandLineRunner demo(UserRepository userRepository, MovieRepository movieRepository) {
	        return (args) -> {
	            // Create and save a new User
	            User user = new User();
	            user.setUsername("demouser");
	            user.setPassword("demouser123!");
	            userRepository.save(user);
	            
	            User user2 = new User();
	            user2.setUsername("demouser2");
	            user2.setPassword("demouser123!");
	            userRepository.save(user2);

	            // Create two movies associated with this user
	            Movie movie1 = new Movie();
	            movie1.setTitle("The Dark Knight");
	            movie1.setDescription("When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.");
	            movie1.setDateAdded(LocalDate.of(2024, 9, 20));
	            movie1.setUser(user);
	            movie1.setLikesCount(10);
	            movie1.setHatesCount(2);
	            
	            Movie movie2 = new Movie();
	            movie2.setTitle("Scarface");
	            movie2.setDescription("Miami in the 1980s: a determined criminal minded Cuban immigrant, becomes the biggest drug smuggler in Florida, and is eventually undone by his own drug addiction.");
	            movie2.setDateAdded(LocalDate.of(2024, 9, 18));
	            movie2.setUser(user2);
	            movie2.setLikesCount(20);
	            movie2.setHatesCount(0);
	            
	            // Save the movies
	            movieRepository.save(movie1);
	            movieRepository.save(movie2);
	        };
	 }

}
