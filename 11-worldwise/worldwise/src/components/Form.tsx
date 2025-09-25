// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useUrlPosition } from '../hooks/useUrlPosition.ts';
import { fetchCityData } from '../functions/fetchCityData.ts';
import styles from '../styles/components/Form.module.scss';

import Button from './Button.tsx';
import CountryIcon from './CountryIcon.tsx';
import Message from './Message.tsx';
import Spinner from './Spinner.tsx';

function Form() {
	const navigate: NavigateFunction = useNavigate();
	const [mapLatitude, mapLongitude] = useUrlPosition();
	const [cityName, setCityName] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [countryCode, setCountryCode] = useState<string>('');
	const [date, setDate] = useState<Date | string>(new Date());
	const [notes, setNotes] = useState<string>('');
	const [isLoadingGeolocation, setIsLoadingGeolocation] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string>('');

	const handleCityNameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setCityName(event.target.value);
	};

	const handleDateInput = (event: ChangeEvent<HTMLInputElement>) => {
		setDate(event.target.value);
	};

	const handleNotesInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(event.target.value);
	};

	const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		navigate('/app/cities', { replace: true });
	};

	useEffect(() => {
		fetchCityData(
			mapLatitude,
			mapLongitude,
			setIsLoadingGeolocation,
			setFetchError,
			setCityName,
			setCountry,
			setCountryCode
		);
		return () => {};
	}, [mapLatitude, mapLongitude]);

	return (
		<>
			{isLoadingGeolocation && <Spinner />}

			{!isLoadingGeolocation && fetchError && <Message message={fetchError} />}

			{!isLoadingGeolocation && !fetchError && (
				<form className={styles.form}>
					<div className={styles.row}>
						<label htmlFor='cityName'>City name</label>
						<input
							id='cityName'
							onChange={handleCityNameInput}
							value={cityName}
						/>
						<span className={styles.flag}>
							<CountryIcon countryCode={countryCode} />
						</span>
					</div>

					<div className={styles.row}>
						<label htmlFor='date'>When did you go to {cityName}?</label>
						<input
							id='date'
							onChange={handleDateInput}
							value={date as string}
						/>
					</div>

					<div className={styles.row}>
						<label htmlFor='notes'>Notes about your trip to {cityName}</label>
						<textarea
							id='notes'
							onChange={handleNotesInput}
							value={notes}
						/>
					</div>

					<div className={styles.buttons}>
						<Button type='primary'>Add</Button>
						<Button
							type='back'
							onClick={handleBack}
						>
							&larr; Back
						</Button>
					</div>
				</form>
			)}
		</>
	);
}

export default Form;
