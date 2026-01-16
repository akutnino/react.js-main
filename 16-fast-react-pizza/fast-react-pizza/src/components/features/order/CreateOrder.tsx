import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { createOrderData } from '../../../stores/actions/orderActions.ts';
import { selectOrder } from '../../../stores/selectors/orderSelectors.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type { CreateOrderObjectType } from '../../../types/stores/actions/order-types.ts';
import type { OrderInitialStateType } from '../../../types/stores/reducers/order-types.ts';

import LoadingIndicator from '../../common/LoadingIndicator.tsx';
import type { UserInitialStateType } from '../../../types/stores/reducers/user-types.ts';
import { selectUser } from '../../../stores/selectors/userSelectors.ts';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string): boolean => /(^(\+)(\d){12}$)|(^\d{11}$)/.test(str);

const fakeCart = [
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 12,
		name: 'Mediterranean',
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 6,
		name: 'Vegetale',
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 11,
		name: 'Spinach and Mushroom',
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

function CreateOrder() {
	const { isLoading, order }: OrderInitialStateType = useSelector(selectOrder);
	const { username }: UserInitialStateType = useSelector(selectUser);

	const [firstName, setFirstName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [phoneNumberError, setPhoneNumberError] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [withPriority, setWithPriority] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();

	const userHasOrdered: boolean = !isLoading && order !== null;
	const userHasNotOrdered: boolean = !isLoading && order === null;
	const cart = fakeCart;

	const handleFirstNameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.currentTarget.value);
	};

	const handlePhoneNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value;

		const isValidValue: boolean = isValidPhone(value) || value === '';
		const notValidValue: boolean = !isValidPhone(value);

		const errorMessage: string =
			value.length < 11 && Number.isInteger(Number(value))
				? 'Must be 11 digits'
				: 'Phone Number should only be Numbers';

		if (value.length > 11) return;

		if (notValidValue) setPhoneNumberError(errorMessage);
		if (isValidValue) setPhoneNumberError('');

		if (value.length <= 11) setPhoneNumber(value);
	};

	const handleAddressInput = (event: ChangeEvent<HTMLInputElement>) => {
		setAddress(event.currentTarget.value);
	};

	const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		setWithPriority(event.target.checked);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!firstName || !phoneNumber || !address) return;
		if (!isValidPhone(phoneNumber)) return;

		const newOrder: CreateOrderObjectType = {
			customer: firstName,
			phone: phoneNumber,
			address,
			withPriority,
			cart,
		};

		dispatch(createOrderData(newOrder));
		setFirstName('');
		setPhoneNumber('');
		setPhoneNumberError('');
		setAddress('');
		setWithPriority(false);
	};

	return (
		<>
			{isLoading && <LoadingIndicator />}

			{userHasNotOrdered && (
				<div className='px-4 py-6'>
					<h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

					<form onSubmit={handleSubmit}>
						<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
							<label className='sm:basis-40'>First Name</label>
							<input
								className='input grow'
								type='text'
								name='customer'
								defaultValue={username || firstName}
								onChange={handleFirstNameInput}
								required
							/>
						</div>

						<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
							<label className='sm:basis-40'>Phone number</label>
							<div className='grow'>
								<input
									className='input w-full'
									type='tel'
									name='phone'
									value={phoneNumber}
									onChange={handlePhoneNumberInput}
									required
								/>

								{phoneNumberError && (
									<p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
										{phoneNumberError}
									</p>
								)}
							</div>
						</div>

						<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
							<label className='sm:basis-40'>Address</label>
							<div className='grow'>
								<input
									className='input w-full'
									type='text'
									name='address'
									value={address}
									onChange={handleAddressInput}
									required
								/>
							</div>
						</div>

						<div className='mb-12 flex items-center gap-5'>
							<input
								className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
								type='checkbox'
								name='priority'
								id='priority'
								checked={withPriority}
								onChange={handleCheckbox}
							/>
							<label
								className='font-medium'
								htmlFor='priority'
							>
								Want to yo give your order priority?
							</label>
						</div>

						<div>
							<input
								type='hidden'
								name='cart'
								value={JSON.stringify(cart)}
							/>
							<button
								className='inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4'
								type='submit'
								disabled={Boolean(phoneNumberError)}
							>
								{isLoading ? 'Placing order....' : 'Order now'}
							</button>
						</div>
					</form>
				</div>
			)}

			{userHasOrdered && (
				<Navigate
					to={`/order/${order?.id}`}
					replace={true}
				/>
			)}
		</>
	);
}

export default CreateOrder;
