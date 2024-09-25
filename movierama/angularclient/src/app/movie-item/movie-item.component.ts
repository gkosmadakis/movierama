import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/MovieService';
import { LoginService } from '../services/LoginService';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/AuthService';
import { User } from '../models/user.model';

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
	likesCount: number = 0;
	hatesCount: number = 0;
	isMovieOwner: boolean = false;
	userReacted: boolean = false;
	reactionStatus: string = '';
	undoReaction: string = '';
	movieServiceSubscription!: Subscription;
	movies: Movie[] = [];
	numberOfReactions: number = 0;

	constructor(private movieService: MovieService, 
		private loginService: LoginService, private authService: AuthService) { }
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
		if(this.numberOfReactions >= 2){
			return;
		}
		if(this.likesCount > 0 || this.hatesCount > 0){
			this.changeReaction(movie);
		}
		if(movie.user.username != this.authService.getCurrentUser().username){
		//	this.movieService.likeMovie(movie);
			this.moviesLikedByUser(movie);
			this.userReacted = true;
			this.reactionStatus = 'You like this movie'; 
			this.undoReaction = 'Unlike';
		}
		this.numberOfReactions++;
	  }
	
	  // Call the service to increment the hate count
	  onHateMovie(movie: Movie) {
		if(this.numberOfReactions >= 2){
			return;
		}
		if(this.likesCount > 0 || this.hatesCount > 0){
			this.changeReaction(movie);
		}
		if(movie.user.username != this.authService.getCurrentUser().username){
			//this.movieService.hateMovie(movie);
			this.moviesHatedByUser(movie);
			this.userReacted = true;
			this.reactionStatus = 'You hate this movie';
			this.undoReaction = 'Unhate'; 
		}
		this.numberOfReactions++;
	  }

	  moviesLikedByUser(movie: Movie){
		this.moviesUserLiked.push(movie.id);
		this.moviesUserLiked.forEach(item =>{
			if(movie.id == item && this.likesCount==0){
				this.movie.likesCount++;
				this.likesCount++;
			}
			if(this.hatesCount == 1){
				this.movie.likesCount--;
				this.hatesCount--;
			}
		});
	  }
	  
	  moviesHatedByUser(movie: Movie){
		this.moviesUserLiked.push(movie.id);
		this.moviesUserLiked.forEach(item =>{
			if(movie.id == item && this.hatesCount==0){
				this.movie.hatesCount++;
				this.hatesCount++;
			}
			if(this.likesCount == 1){
				this.movie.likesCount--;
				this.likesCount--;
			}
		});
	  }

	  changeReaction(movie: Movie){
		if(this.reactionStatus == 'You like this movie'){
			this.userReacted = false;
			this.moviesUserLiked.forEach(item =>{
				if(movie.id == item && this.likesCount == 1){
					this.movie.likesCount--;
					this.likesCount--;
				}
			});
		}
		else {
			this.userReacted = false;
			this.moviesUserLiked.forEach(item =>{
				if(movie.id == item && this.hatesCount == 1){
					this.movie.hatesCount--;
					this.hatesCount--;
				}
			});
		}
	  }
}
