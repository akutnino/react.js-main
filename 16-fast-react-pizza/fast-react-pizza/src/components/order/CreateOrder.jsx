import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useSelector } from 'react-redux';
import { getUsername } from '../../stores/selectors/userSelectors';
import { getCartArray, getTotalCartPrice } from '../../stores/selectors/cartSelectors';
import { clearCart } from '../../stores/actions/cartActions';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../interfaces/Button';
import EmptyCart from '../cart/EmptyCart';
import store from '../../stores/store';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);

async function action(props) {
	const { request } = props;
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'true',
	};

	const errors = {};
	if (!isValidPhone(order.phone)) errors.phone = 'Invalid Phone Number';
	if (Object.keys(errors).length > 0) return errors;

	// If everything is okay, create new order and redirect.
	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
	const [withPriority, setWithPriority] = useState(false);
	const userName = useSelector(getUsername);
	const cartArray = useSelector(getCartArray);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;
	const formErrors = useActionData();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const handlePriorityToggle = (event) => {
		setWithPriority(event.target.checked);
	};

	if (!cartArray.length) return <EmptyCart />;
	return (
		<div className='px-4 py-6'>
			<h2 className='mb-8 text-xl font-semibold'>Ready to order? Lets go!</h2>

			{/* <Form method="POST" action="/order/new"> */}
			<Form method='POST'>
				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>First Name</label>
					<input
						className='input grow'
						type='text'
						name='customer'
						defaultValue={userName}
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
							required
						/>
						{formErrors?.phone && (
							<p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
								{formErrors.phone}
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
						value={withPriority}
						onChange={handlePriorityToggle}
					/>
					<label
						htmlFor='priority'
						className='font-medium'
					>
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input
						type='hidden'
						name='cart'
						value={JSON.stringify(cartArray)}
					/>
					<Button
						disabled={isSubmitting}
						type='primary'
					>
						{isSubmitting
							? 'Placing order....'
							: `Order now for ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export { CreateOrder as default, action };
