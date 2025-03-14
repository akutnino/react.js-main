import { type Dispatch } from 'react';

function MovieDetails({
	selectedMovieID,
	setSelectedMovieID,
}: {
	selectedMovieID: string | null;
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
}) {
	const handleCloseDetails = () => {
		setSelectedMovieID(null);
	};

	return (
		<div className='details'>
			<button
				className='btn-back'
				onClick={handleCloseDetails}
			>
				&larr;
			</button>
			{selectedMovieID}
		</div>
	);
}

export default MovieDetails;
