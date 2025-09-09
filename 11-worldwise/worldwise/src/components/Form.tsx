// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, type ChangeEvent, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import styles from '../styles/components/Form.module.scss';

import Button from './Button.tsx';

function Form() {
	const navigate: NavigateFunction = useNavigate();
	const [cityName, setCityName] = useState<string>('');
	// const [country, setCountry] = useState<string>('');
	const [date, setDate] = useState<Date | string>(new Date());
	const [notes, setNotes] = useState<string>('');

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
		navigate(-1);
	};

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={handleCityNameInput}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{emoji}</span> */}
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
	);
}

export default Form;
