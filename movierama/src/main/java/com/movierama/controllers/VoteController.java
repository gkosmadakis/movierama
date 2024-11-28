package com.movierama.controllers;

import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movierama.dto.VoteResponse;
import com.movierama.models.Vote;
import com.movierama.models.VoteType;
import com.movierama.services.MovieService;
import com.movierama.services.VoteService;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:4200")
public class VoteController {

	@Autowired
	private VoteService voteService;
	
	@Autowired
	private MovieService movieService;
	
	@GetMapping("/likes/{id}")
    public ResponseEntity<List<Vote>> findLikesByMovieId(@PathVariable String id) {
        return ResponseEntity.ok(voteService.findLikesByMovieId(Long.parseLong(id)));
    }
	
	@GetMapping("/hates/{id}")
    public ResponseEntity<List<Vote>> findHatesByMovieId(@PathVariable String id) {
        return ResponseEntity.ok(voteService.findHatesByMovieId(Long.parseLong(id)));
    }

	@PostMapping
	public ResponseEntity<VoteResponse> voteMovie(@RequestBody Vote vote) throws NotFoundException {
	    Vote existingVote = voteService.findVotesByMovieAndUser(vote.getMovieId(), vote.getUserId());
	    // Same vote already exists
	    if (existingVote != null && existingVote.getVoteType().equals(vote.getVoteType())) {
	        VoteResponse response = new VoteResponse();
	        response.setMessage("Vote already exists");
	        response.setStatus("duplicate");
	        return ResponseEntity.ok(response);
	    }
	    //User wants to change the vote
	    else if (existingVote != null && !existingVote.getVoteType().equals(vote.getVoteType())) {
	    	Vote toDelete = voteService.findById(existingVote.getId());
			if (toDelete == null)
				throw new NotFoundException();
			voteService.delete(existingVote.getId());
			 //Decrease likeCount/hateCount on Movie Table
		    if(vote.getVoteType().equals(VoteType.LIKE)) {
		    	movieService.decreaseHates(vote.getMovieId());
		    }
		    else if (vote.getVoteType().equals(VoteType.HATE)) {
		    	movieService.decreaseLikes(vote.getMovieId());
		    }
	    }

	    Vote savedVote = voteService.voteMovie(vote);
	    VoteResponse response = new VoteResponse();
	    response.setMessage("Vote submitted successfully");
	    response.setStatus("success");
	    response.setVote(savedVote);
	    //Increase likeCount/hateCount on Movie Table
	    if(vote.getVoteType().equals(VoteType.LIKE)) {
	    	movieService.increaseLikes(vote.getMovieId());
	    }
	    else if (vote.getVoteType().equals(VoteType.HATE)) {
	    	movieService.increaseHates(vote.getMovieId());
	    }
	    return ResponseEntity.ok(response);
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpResponse<?>> deleteVote(@PathVariable String id) throws NotFoundException {
		Vote toDelete = voteService.findById(Long.parseLong(id));
		if (toDelete == null)
			throw new NotFoundException();
		voteService.delete(Long.parseLong(id));
		if(toDelete.getVoteType().equals(VoteType.LIKE)) {
	    	movieService.decreaseLikes(toDelete.getMovieId());
	    }
	    else if (toDelete.getVoteType().equals(VoteType.HATE)) {
	    	movieService.decreaseHates(toDelete.getMovieId());
	    }
		return ResponseEntity.ok().build();
	}

}
