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
