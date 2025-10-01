// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {
	useEffect,
	useState,
	type ChangeEvent,
	type FormEvent,
	type MouseEvent,
} from 'react';
import { useCities } from '../contexts/CitiesContext.tsx';
import { DatePicker } from 'react-datepicker';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useUrlPosition } from '../hooks/useUrlPosition.ts';
import type { CityDataType } from '../types/components/types.ts';
import styles from '../styles/components/Form.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

import Button from './Button.tsx';
import CountryIcon from './CountryIcon.tsx';
import Message from './Message.tsx';
import Spinner from './Spinner.tsx';

function Form() {
	const { isLoading, getNewCityData, postNewCityData } = useCities();
	const navigate: NavigateFunction = useNavigate();
	const [mapLatitude, mapLongitude] = useUrlPosition();
	const [cityName, setCityName] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [countryCode, setCountryCode] = useState<string>('');
	const [date, setDate] = useState<Date | null>(new Date());
	const [notes, setNotes] = useState<string>('');
	const [isLoadingGeolocation, setIsLoadingGeolocation] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string>('');

	const handleCityNameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setCityName(event.target.value);
	};

	const handleDateInput = (date: Date | null) => {
		setDate(date);
	};

	const handleNotesInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(event.target.value);
	};

	const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		navigate('/app/cities', { replace: true });
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!cityName || !date) return;

		const newCityData: CityDataType = {
			cityName,
			country,
			date: String(date),
			emoji: countryCode,
			notes,
			position: {
				lat: Number(mapLatitude),
				lng: Number(mapLongitude),
			},
		};

		await postNewCityData(newCityData);
		navigate('/app/cities', { replace: true });
	};

	useEffect(() => {
		if (!mapLatitude && !mapLongitude) return;

		getNewCityData(
			mapLatitude,
			mapLongitude,
			setIsLoadingGeolocation,
			setFetchError,
			setCityName,
			setCountry,
			setCountryCode
		);
		return () => {};
	}, [mapLatitude, mapLongitude, getNewCityData]);

	return (
		<>
			{!mapLatitude && !mapLongitude && <Message message='Click on the Map to Start.' />}

			{isLoadingGeolocation && <Spinner />}

			{!isLoadingGeolocation && fetchError && <Message message={fetchError} />}

			{!isLoadingGeolocation && !fetchError && mapLatitude && mapLongitude && (
				<form
					className={`${styles.form} ${isLoading ? styles.loading : ''}`}
					onSubmit={handleFormSubmit}
				>
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
						<DatePicker
							id='date'
							onChange={handleDateInput}
							selected={date}
							dateFormat={'dd/MM/yyyy'}
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
						<Button type='submit'>Add</Button>
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
