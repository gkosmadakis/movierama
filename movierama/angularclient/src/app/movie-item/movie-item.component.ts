import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/MovieService';
import { LoginService } from '../services/LoginService';
import { VoteService } from '../services/VoteService';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/AuthService';
import { Vote } from '../models/vote.model';

@Component({
	selector: 'app-movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.css']
})

export class MovieItemComponent {
	@Input() movie!: Movie;
	datePosted: number = 0;
	username: string = '';
	moviesUserLiked: number[] = [];
	likes: number = 0;
	hates: number = 0;
	isMovieOwner: boolean = false;
	userReacted: boolean = false;
	reactionStatus: string = '';
	undoReaction: string = '';
	movieServiceSubscription!: Subscription;
	movies: Movie[] = [];
	votes: Vote[] = [];

	constructor(private movieService: MovieService, 
		private loginService: LoginService, private authService: AuthService, private voteService: VoteService) { }

	ngOnInit(): void {
    this.getDaysFromPosted();
  }

	getDaysFromPosted() {
		// get the date difference and return it
		const currentDate = new Date();
		const dateSent = new Date(this.movie.dateAdded);
		this.datePosted = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
	}

	// Call the service to increment the like count
	onLikeMovie(movie: Movie) {
		this.votes = [];
			const vote = {
				id: 0,
				movieId: movie.id,
				userId: movie.user.id,
				voteType: 'like' as any
			}
			console.log('Calling vote for like');
			this.movieServiceSubscription = this.voteService.voteMovie(vote).subscribe( { next: (response) => {
				console.log('A new vote is added ',response);
				if (response.status === 'duplicate') {
					alert(response.message); // Show message if vote already exists
				  } else {
					alert('Vote submitted successfully!');
					console.log('Saved vote:', response);
					this.votes.push(response.vote);
					this.userReacted = true;
					this.reactionStatus = 'You like this movie'; 
					this.undoReaction = 'Unlike';
					this.reloadVotes(response.vote.movieId);
				  }
			},
			error: (err) => {
			  console.error('Error submitting vote:', err);
			}
		  });
	  }
	
	  // Call the service to increment the hate count
	  onHateMovie(movie: Movie) {
		this.votes = [];
		const vote = {
			id: 0,
			movieId: movie.id,
			userId: movie.user.id,
			voteType: 'hate' as any
		}
		console.log('Calling vote for hate');
		this.movieServiceSubscription = this.voteService.voteMovie(vote).subscribe( { next: (response) => {
			console.log('A new vote is added ',response);
			if (response.status === 'duplicate') {
				alert(response.message); // Show message if vote already exists
			  } else {
				alert('Vote submitted successfully!');
				console.log('Saved vote:', response);
				this.votes.push(response.vote);
				this.userReacted = true;
				this.reactionStatus = 'You hate this movie'; 
				this.undoReaction = 'Unhate';
				this.reloadVotes(response.vote.movieId);
			  }
			
		},
		error: (err) => {
		  console.error('Error submitting vote:', err);
		}
	  });
	  }

	  changeReaction(id: number){
		console.log('ID to delete is ', id);
		if(this.reactionStatus == 'You like this movie'){
			this.movieServiceSubscription = this.voteService.removeVote(id).subscribe(data => {
				console.log('Like is removed');
				this.movieServiceSubscription = this.voteService.getLikesByMovieId(this.movie.id).subscribe(data => {
				  this.movie.likes = data.length;
				  console.log('Reload likes for movie id ',this.movie.id);
				});
			});
		}
		else {
		this.movieServiceSubscription = this.voteService.removeVote(id).subscribe(data => {
				console.log('hate is removed');
				this.movieServiceSubscription = this.voteService.getHatesByMovieId(this.movie.id).subscribe(data => {
				  this.movie.hates = data.length;
				  console.log('Reload hates for movie id ',this.movie.id);
				});
			});
		}
		this.votes = [];
		this.userReacted = false;
	  }

	  reloadVotes(movieId: number) {
		this.movieServiceSubscription = this.voteService.getLikesByMovieId(movieId).subscribe(data => {
			this.movie.likes = data.length;
			console.log('Reload likes for movie id ',movieId, data.length);
		});
		this.movieServiceSubscription = this.voteService.getHatesByMovieId(movieId).subscribe(data => {
			this.movie.hates = data.length;
			console.log('Reload hates for movie id ',movieId, data.length);
		});
	  }
}
