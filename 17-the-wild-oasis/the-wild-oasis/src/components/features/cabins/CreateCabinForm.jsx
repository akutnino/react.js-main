import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';
import Input from '../../common/Input';
import Form from '../../common/Form';
import Button from '../../common/Button';
import FileInput from '../../common/FileInput';
import Textarea from '../../common/Textarea';
import FormRow from '../../common/FormRow';

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (newCabin) => createCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});

			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const handleOnSubmit = (data) => {
		mutate(data);
		console.log(data);
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
					disabled={isPending}
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
					disabled={isPending}
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
					disabled={isPending}
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
					disabled={isPending}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required.',
						validate: (currentValue) =>
							getValues().regularPrice >= currentValue ||
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
					disabled={isPending}
					defaultValue=''
					{...register('description', {
						required: 'This field is required.',
					})}
				/>
			</FormRow>

			<FormRow
				formLabel={'Cabin Photo'}
				error={errors?.image?.message}
				disabled={isPending}
			>
				<FileInput
					id='image'
					accept='image/*'
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					disabled={isPending}
				>
					Cancel
				</Button>
				<Button disabled={isPending}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
