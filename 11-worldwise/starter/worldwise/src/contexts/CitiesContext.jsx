import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

CitiesProvider.propTypes = {
	children: PropTypes.node,
};

const CitiesContext = createContext();

function CitiesProvider(props) {
	const { children } = props;
	const [citiesArray, setCitiesArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const controller = new AbortController();

		const fetchCities = async () => {
			try {
				setIsLoading(true);

				const fetchURL = `http://localhost:5000/cities`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					Signal: controller.signal,
				};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data = await response.json();
				setCitiesArray(data);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error({ error });
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchCities();
		return () => {
			controller.abort();
		};
	}, []);

	const getCity = async (id) => {
		try {
			setIsLoading(true);

			const fetchURL = `http://localhost:5000/cities/${id}`;
			const fetchOptions = {
				Headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

			const data = await response.json();
			setCurrentCity(data);
		} catch (error) {
			console.error({ error });
		} finally {
			setIsLoading(false);
		}
	};

	const createCity = async (newCityObject) => {
		try {
			setIsLoading(true);

			const fetchURL = `http://localhost:5000/cities`;
			const fetchOptions = {
				method: 'POST',
				Headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(newCityObject),
			};

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

			const data = await response.json();
			setCitiesArray((currentCitiesArray) => [...currentCitiesArray, data]);
		} catch (error) {
			console.log({ error });
		} finally {
			setIsLoading(false);
		}
	};

	const deleteCity = async (cityID) => {
		try {
			setIsLoading(true);

			const fetchURL = `http://localhost:5000/cities/${cityID}`;
			const fetchOptions = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

			setCitiesArray((currentCitiesArray) =>
				currentCitiesArray.filter((cityObject) => cityObject.id !== cityID)
			);
		} catch (error) {
			console.error({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				citiesArray,
				setCitiesArray,
				isLoading,
				setIsLoading,
				currentCity,
				setCurrentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	const ERROR_MESSAGE = 'useCities() is outside the CitiesProvider() scope!';

	if (context === undefined) throw new Error(ERROR_MESSAGE);
	return context;
}

export { CitiesProvider, useCities };
