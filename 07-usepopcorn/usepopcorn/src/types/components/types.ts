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

type SuccessResponseDataType = {
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

export type ResponseDataType = SuccessResponseDataType | FailedResponseDataType;
