import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
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

	const { updateSetting, isUpdating } = useUpdateSetting();

	const handleUpdate = (fieldName) => {
		return (event) => {
			const inputValue = event.target.value;

			if (!inputValue) return;
			updateSetting({ [fieldName]: inputValue });
		};
	};

	if (isLoading) return <Spinner />;
	return (
		<Form>
			<FormRow formLabel='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={handleUpdate('minBookingLength')}
				/>
			</FormRow>

			<FormRow formLabel='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					disabled={isUpdating}
					defaultValue={maxBookingLength}
					onBlur={handleUpdate('maxBookingLength')}
				/>
			</FormRow>

			<FormRow formLabel='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					disabled={isUpdating}
					defaultValue={maxGuestsPerBooking}
					onBlur={handleUpdate('maxGuestsPerBooking')}
				/>
			</FormRow>

			<FormRow formLabel='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					disabled={isUpdating}
					defaultValue={breakfastPrice}
					onBlur={handleUpdate('breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
