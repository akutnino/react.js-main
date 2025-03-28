export type MovieDataType = {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
};

export type WatchedMovieDataType = {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
	runtime: number;
	imdbRating: number;
	userRating: number;
};

type FailedResponseDataType = {
	Response: 'False';
	Error: string;
};

type SuccessFetchMoviesResponseDataType = {
	Response: 'True';
	Search: {
		imdbID: string;
		Title: string;
		Year: string;
		Poster: string;
		Type: string;
	}[];
	totalResults: string;
};

export type FetchMoviesResponseType =
	| SuccessFetchMoviesResponseDataType
	| FailedResponseDataType;

export type SuccessFetchMoviesDetailsResponseType = {
	Actors: string;
	Awards: string;
	Country: string;
	Director: string;
	Genre: string;
	Language: string;
	Metascore: string;
	Plot: string;
	Poster: string;
	Rated: string;
	Ratings: {
		Source: string;
		Value: string;
	}[];
	Released: string;
	Response: 'True';
	Runtime: string;
	Title: string;
	Type: string;
	Writer: string;
	Year: string;
	imdbID: string;
	imdbRating: string;
	imdbVotes: string;
	totalSeasons: string;
};

export type FetchMovieDetailsResponseType =
	| SuccessFetchMoviesDetailsResponseType
	| FailedResponseDataType;
