package com.movierama.models;

import com.fasterxml.jackson.annotation.JsonValue;

public enum VoteType {

	LIKE("like"),
	HATE("hate");
	
	@JsonValue
    public final String voteType;
	
	private VoteType(String voteType) {
		this.voteType = voteType;
		
	}
}
