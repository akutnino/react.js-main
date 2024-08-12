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

	return (
		<CitiesContext.Provider
			value={{
				citiesArray,
				setCitiesArray,
				isLoading,
				setIsLoading,
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
