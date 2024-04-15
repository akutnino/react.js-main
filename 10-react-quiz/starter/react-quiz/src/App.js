import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

function reducer(state, action) {
	switch (action.payload) {
		case 'a':
			return;
		case 'b':
			return;
		default:
			break;
	}
}

export default function App(props) {
	const initialState = {};
	const [state, dispatch] = useReducer(reducer, initialState);
	const {} = state;

	useEffect(() => {
		const requestController = new AbortController();

		const fetchQuestions = async () => {
			try {
				const URL_RESOURCE = `http://localhost:8080/questions`;
				const fetchOptions = { signal: requestController.signal };

				const response = await fetch(URL_RESOURCE, fetchOptions);
				if (response.ok === false) throw new Error('Failed to Fetch Data');

				const data = await response.json();
				if (data.Response === 'False') throw new Error('Something Went Wrong');

				console.log(data);
			} catch (error) {
				if (error.name !== 'AbortError') console.log(error.name);
			}
		};

		fetchQuestions();
		return () => requestController.abort();
	}, []);

	return (
		<div className='app'>
			<Header />

			<Main className='main'>
				<p>1/15</p>
				<p>Question</p>
			</Main>
		</div>
	);
}
