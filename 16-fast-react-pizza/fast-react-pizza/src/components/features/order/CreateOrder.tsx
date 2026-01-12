import { useLayoutEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderData } from '../../../stores/actions/orderActions.ts';
import { selectOrder } from '../../../stores/selectors/orderSelectors.ts';
import { useNavigate, type NavigateFunction } from 'react-router';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type { CreateOrderObjectType } from '../../../types/stores/actions/order-types.ts';
import type { OrderInitialStateType } from '../../../types/stores/reducers/order-types.ts';

import LoadingIndicator from '../../common/LoadingIndicator.tsx';

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
	const [firstName, setFirstName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [phoneNumberError, setPhoneNumberError] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [withPriority, setWithPriority] = useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const cart = fakeCart;

	const handleFirstNameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.currentTarget.value);
	};

	const handlePhoneNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value;
		const errorMessage: string =
			value.length < 11 && Number.isInteger(Number(value))
				? 'Must be 11 digits'
				: 'Phone Number should only be Numbers';

		if (value.length > 11) return;

		if (!isValidPhone(value)) setPhoneNumberError(errorMessage);
		if (isValidPhone(value) || value === '') setPhoneNumberError('');

		if (value.length <= 11) setPhoneNumber(value);
		return;
	};

	const handleAddressInput = (event: ChangeEvent<HTMLInputElement>) => {
		setAddress(event.currentTarget.value);
	};

	const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		setWithPriority(event.target.checked);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

	useLayoutEffect(() => {
		if (order === null) return;
		if (order.id !== undefined) navigate(`/order/${order.id}`, { replace: true });
		return () => {};
	}, [order, order?.id, navigate]);

	return (
		<>
			{isLoading && <LoadingIndicator />}

			{!isLoading && (
				<div>
					<h2>Ready to order? Let's go!</h2>

					<form onSubmit={handleSubmit}>
						<div>
							<label>First Name</label>
							<input
								type='text'
								name='customer'
								value={firstName}
								onChange={handleFirstNameInput}
								required
							/>
						</div>

						<div>
							<label>Phone number</label>
							<div>
								<input
									type='tel'
									name='phone'
									value={phoneNumber}
									onChange={handlePhoneNumberInput}
									required
								/>
								{phoneNumberError && <span>{phoneNumberError}</span>}
							</div>
						</div>

						<div>
							<label>Address</label>
							<div>
								<input
									type='text'
									name='address'
									value={address}
									onChange={handleAddressInput}
									required
								/>
							</div>
						</div>

						<div>
							<input
								type='checkbox'
								name='priority'
								id='priority'
								checked={withPriority}
								onChange={handleCheckbox}
							/>
							<label htmlFor='priority'>Want to yo give your order priority?</label>
						</div>

						<div>
							<button
								type='submit'
								disabled={Boolean(phoneNumberError)}
							>
								Order Now
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}

export default CreateOrder;
