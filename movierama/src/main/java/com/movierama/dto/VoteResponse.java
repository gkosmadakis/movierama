package com.movierama.dto;

import com.movierama.models.Vote;

public class VoteResponse {
    private String message;
    private String status;
    private Vote vote;
    
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Vote getVote() {
		return vote;
	}
	public void setVote(Vote vote) {
		this.vote = vote;
	}
    
}

