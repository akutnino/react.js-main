import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createEditCabin } from '../../../services/apiCabins';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Input from '../../common/Input';
import Form from '../../common/Form';
import Button from '../../common/Button';
import FileInput from '../../common/FileInput';
import Textarea from '../../common/Textarea';
import FormRow from '../../common/FormRow';

CreateCabinForm.propTypes = {
	cabinToEdit: PropTypes.object,
};

function CreateCabinForm(props) {
	const { cabinToEdit = {} } = props;
	const { id: editID, ...editValues } = cabinToEdit;
	const isEdisSession = Boolean(editID);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: isEdisSession ? editValues : {},
	});

	const queryClient = useQueryClient();

	const { mutate: createCabin, isPending: isCreating } = useMutation({
		mutationFn: (newCabin) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});

			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinDate, id }) => createEditCabin(newCabinDate, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});

			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const isWorking = isCreating || isEditing;

	const handleOnSubmit = (data) => {
		const imageData = typeof data.image === 'string' ? data.image : data.image[0];

		if (isEdisSession) {
			editCabin({
				newCabinDate: { ...data, image: imageData },
				id: editID,
			});
		} else {
			createCabin({ ...data, image: imageData });
		}

		// console.log(data.image[0]);
		// console.log(data);
		// console.log(data.image);
		// console.log(data.image?.includes('https://cvdwjdqjcdkmtmktputu.supabase.co'));
	};

	const handleOnSubmitError = (error) => {
		console.log(error);
	};

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit, handleOnSubmitError)}>
			<FormRow
				formLabel={'Cabin Name'}
				error={errors?.name?.message}
			>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Maximum Capacity'}
				error={errors?.maxCapacity?.message}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required.',
						min: {
							value: 1,
							message: 'Capacity needs to be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Regular Price'}
				error={errors?.regularPrice?.message}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Discount'}
				error={errors?.discount?.message}
			>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required.',
						validate: (currentValue) =>
							Number(getValues().regularPrice) >= Number(currentValue) ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Description for Website'}
				error={errors?.description?.message}
			>
				<Textarea
					type='number'
					id='description'
					disabled={isWorking}
					defaultValue=''
					{...register('description', {
						required: 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Cabin Photo'}
				error={errors?.image?.message}
				disabled={isWorking}
			>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEdisSession ? false : 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					disabled={isWorking}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEdisSession ? 'Edit Cabin' : 'Create New Cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
