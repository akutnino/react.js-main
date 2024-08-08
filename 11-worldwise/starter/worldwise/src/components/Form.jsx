// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from '../styles/Form.module.scss';

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

export default function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const navigate = useNavigate();

	const handleCityNameInput = (event) => {
		setCityName(event.target.value);
	};

	const handleDateInput = (event) => {
		setDate(event.target.value);
	};

	const handleNotesInput = (event) => {
		setNotes(event.target.value);
	};

	const handleBackBtn = (event) => {
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
					value={date}
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
				<Button type={'primary'}>Add</Button>
				<Button
					type={'back'}
					onClick={handleBackBtn}
				>
					Back
				</Button>
			</div>
		</form>
	);
}
