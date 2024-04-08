import { useEffect, useState } from 'react';
import StarRating from './StarRating';

const tempMovieData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
	},
	{
		imdbID: 'tt0133093',
		Title: 'The Matrix',
		Year: '1999',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
	},
	{
		imdbID: 'tt6751668',
		Title: 'Parasite',
		Year: '2019',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
	}
];

const tempWatchedData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9
	}
];

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '3494c38';

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedMovieID, setSelectedMovieID] = useState(null);

	/*
	"tt0076759"
	const tempQuery = 'interstellar';

	useEffect(() => {
		console.log('After Initial Render');
	}, []);

	useEffect(() => {
		console.log('After Every Render');
	});

	useEffect(() => {
		console.log('Only Render If the query state changed');
	}, [query]);

	console.log('Initial Render / During Render');
	*/

	useEffect(() => {
		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError('');
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
				);

				if (response.ok === false) {
					throw new Error('Something Went Wrong');
				}

				const data = await response.json();

				if (data.Response === 'False') {
					throw new Error('Movie Not Found');
				}

				setMovies(data.Search);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		fetchMovies();
	}, [query]);

	return (
		<>
			<NavBar>
				<Logo />
				<Search
					query={query}
					setQuery={setQuery}
				/>
				<NumResults movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							setSelectedMovieID={setSelectedMovieID}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedMovieID ? (
						<MovieDetails
							selectedMovieID={selectedMovieID}
							setSelectedMovieID={setSelectedMovieID}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function NavBar(props) {
	const { children } = props;

	return <nav className='nav-bar'>{children}</nav>;
}

function Search(props) {
	const { query, setQuery } = props;

	const handleInput = (event) => {
		const targetValue = event.target.value;
		setQuery(targetValue);
	};

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={handleInput}
		/>
	);
}

function Logo(props) {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function NumResults(props) {
	const { movies } = props;

	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main(props) {
	const { children } = props;

	return <main className='main'>{children}</main>;
}

function Box(props) {
	const { children } = props;
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? '–' : '+'}
			</button>

			{isOpen && children}
		</div>
	);
}

// function WatchedBox(props) {
// 	const [isOpen2, setIsOpen2] = useState(true);

// 	return (
// 		<div className='box'>
// 			<button
// 				className='btn-toggle'
// 				onClick={() => setIsOpen2((open) => !open)}
// 			>
// 				{isOpen2 ? '–' : '+'}
// 			</button>

// 			{isOpen2 && (
// 				<>
// 					<WatchedSummary watched={watched} />
// 					<WatchedMoviesList watched={watched} />
// 				</>
// 			)}
// 		</div>
// 	);
// }

function Loader(props) {
	return <p className='loader'>Loading...</p>;
}

function ErrorMessage(props) {
	const { message } = props;

	return (
		<p className='error'>
			<span>🛑</span> {message}
		</p>
	);
}

function MovieList(props) {
	const { movies, setSelectedMovieID } = props;

	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					setSelectedMovieID={setSelectedMovieID}
				/>
			))}
		</ul>
	);
}

function MovieDetails(props) {
	const { selectedMovieID, setSelectedMovieID } = props;
	const [selectedMovieObject, setSelectedMovieObject] = useState({});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre
	} = selectedMovieObject;

	const handleCloseMovieDetails = () => {
		setSelectedMovieID(null);
	};

	useEffect(() => {
		async function getMovieDetails() {
			try {
				setError('');
				setIsLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`
				);

				if (response.ok === false) {
					throw new Error(`Something Went Wrong`);
				}

				const data = await response.json();

				if (data.Response === 'False') {
					throw new Error('Movie Not Found');
				}

				setSelectedMovieObject(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		getMovieDetails();
	}, [selectedMovieID]);

	return (
		<div className='details'>
			{isLoading && <Loader />}
			{!error && !isLoading && (
				<>
					<header>
						<button
							className='btn-back'
							onClick={handleCloseMovieDetails}
						>
							&larr;
						</button>
						<img
							src={poster}
							alt={`Poster of ${title}`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDB rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating
								maxRating={10}
								size={26}
							/>
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring: {actors}</p>
						<p>Directed by: {director}</p>
					</section>
				</>
			)}
			{error && <ErrorMessage message={error} />}
		</div>
	);
}

function Movie(props) {
	const { movie, setSelectedMovieID } = props;

	const handleSelectMovie = (id) => {
		return () =>
			setSelectedMovieID((currentState) => (currentState === id ? null : id));
	};

	return (
		<li onClick={handleSelectMovie(movie.imdbID)}>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function WatchedSummary(props) {
	const { watched } = props;
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMoviesList(props) {
	const { watched } = props;

	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function WatchedMovie(props) {
	const { movie } = props;

	return (
		<li>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}
