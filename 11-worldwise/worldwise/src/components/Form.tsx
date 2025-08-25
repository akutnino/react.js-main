// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, type ChangeEvent } from 'react';
import styles from '../styles/components/Form.module.scss';

function Form() {
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
				<button>Add</button>
				<button>&larr; Back</button>
			</div>
		</form>
	);
}

export default Form;
