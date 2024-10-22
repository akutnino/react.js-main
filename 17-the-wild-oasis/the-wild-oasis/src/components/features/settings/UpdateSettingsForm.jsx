import { useSettings } from './useSettings';
import Form from '../../common/Form';
import FormRow from '../../common/FormRow';
import Input from '../../common/Input';
import Spinner from '../../common/Spinner';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	if (isLoading) return <Spinner />;
	return (
		<Form>
			<FormRow formLabel='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={minBookingLength}
				/>
			</FormRow>

			<FormRow formLabel='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maxBookingLength}
				/>
			</FormRow>

			<FormRow formLabel='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking}
				/>
			</FormRow>

			<FormRow formLabel='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
