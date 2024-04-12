import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '3494c38';

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	// const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedMovieID, setSelectedMovieID] = useState(null);
	const [watched, setWatched] = useState(() => {
		const storedValue = localStorage.getItem('watchedMovie');
		return JSON.parse(storedValue);
	});

	useEffect(() => {
		const controller = new AbortController();

		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!response.ok) {
					throw new Error('Something Went Wrong');
				}

				const data = await response.json();

				if (data.Response === 'False') {
					throw new Error('Movie Not Found');
				}

				setMovies(data.Search);
				setError('');
			} catch (error) {
				if (error.name !== 'AbortError') {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		setSelectedMovieID(null);
		fetchMovies();
		return () => controller.abort();
	}, [query]);

	useEffect(() => {
		localStorage.setItem('watchedMovie', JSON.stringify(watched));
	}, [watched]);

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
							setWatched={setWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								setWatched={setWatched}
							/>
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
	const inputElement = useRef(null);

	const handleInput = (event) => {
		const targetValue = event.target.value;
		setQuery(targetValue);
	};

	// useEffect(() => {
	// 	const element = document.querySelector('.search');
	// 	console.log(element);
	// }, []);

	useEffect(() => {
		const keyDownEventCallback = (event) => {
			if (document.activeElement === inputElement.current) return;

			if (event.code === 'Enter') {
				inputElement.current.focus();
				setQuery('');
			}
		};

		document.addEventListener('keydown', keyDownEventCallback);
		return () => document.removeEventListener('keydown', keyDownEventCallback);
	}, [setQuery]);

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={handleInput}
			ref={inputElement}
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
	const { selectedMovieID, setSelectedMovieID, setWatched, watched } = props;
	const [selectedMovieObject, setSelectedMovieObject] = useState({});
	const [userMovieRating, setUserMovieRating] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const rateCountRef = useRef(0);

	// prettier-ignore
	const movieIsWatched = watched
		.map((watchedMovieObj) =>
			watchedMovieObj.imdbID === selectedMovieID 
			? true 
			: false
		)
		.includes(true);

	const watchedMovieRating = watched
		.map((watchedMovieObj) =>
			watchedMovieObj.imdbID === selectedMovieID
				? watchedMovieObj.userRating
				: false
		)
		.filter((val) => val);

	const {
		Title: title,
		Poster: poster,
		Year: year,
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

	const handleAddWatchedMovie = () => {
		const newWatchedMovieObject = {
			imdbID: selectedMovieID,
			title,
			year,
			poster,
			runtime: Number(runtime.split(' ').at(0)),
			imdbRating: Number(imdbRating),
			userRating: userMovieRating,
			ratingCountDecisions: rateCountRef.current
		};

		setWatched((currentState) => [...currentState, newWatchedMovieObject]);
		handleCloseMovieDetails();
	};

	useEffect(() => {
		const getMovieDetails = async () => {
			try {
				setError('');
				setIsLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`
				);

				if (!response.ok) {
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
		};

		getMovieDetails();
	}, [selectedMovieID]);

	useEffect(() => {
		if (!title) return;
		document.title = `Movie | ${title}`;

		return () => {
			document.title = 'usePopcorn';
		};
	}, [title]);

	useEffect(() => {
		const keyDownEventCallback = (event) => {
			if (event.code === 'Escape') {
				handleCloseMovieDetails();
				console.log('CLOSING');
			}
		};

		document.addEventListener('keydown', keyDownEventCallback);
		return () => document.removeEventListener('keydown', keyDownEventCallback);
	}, [handleCloseMovieDetails]);

	useEffect(() => {
		if (userMovieRating) {
			rateCountRef.current = rateCountRef.current + 1;
		}
	}, [userMovieRating]);

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
							{!movieIsWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={26}
										onSetRating={setUserMovieRating}
									/>
									{userMovieRating > 0 && (
										<button
											className='btn-add'
											onClick={handleAddWatchedMovie}
										>
											+ Add to List
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie: <span>⭐</span> {watchedMovieRating} /
									10
								</p>
							)}
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
					<span>{avgImdbRating.toFixed(1)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(1)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(1)} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMoviesList(props) {
	const { watched, setWatched } = props;

	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie
					movie={movie}
					setWatched={setWatched}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function WatchedMovie(props) {
	const { movie, setWatched } = props;

	const handleDeleteWatchedMovie = (movieID) => {
		return () =>
			setWatched((currentState) =>
				currentState.filter((val) => (val.imdbID === movieID ? false : true))
			);
	};

	return (
		<li>
			<img
				src={movie.poster}
				alt={`${movie.title} poster`}
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

				<button
					className='btn-delete'
					onClick={handleDeleteWatchedMovie(movie.imdbID)}
				>
					X
				</button>
			</div>
		</li>
	);
}
