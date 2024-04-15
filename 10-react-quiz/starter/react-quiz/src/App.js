import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
	questions: [],
	status: 'loading'
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, status: 'ready', questions: action.payload };

		case 'dataFailed':
			return { ...state, status: 'error' };

		default:
			throw new Error('Unknown Action');
	}
}

export default function App(props) {
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
				dispatch({ type: 'dataReceived', payload: data });
			} catch (error) {
				if (error.name !== 'AbortError') dispatch({ type: 'dataFailed' });
				console.log(error.message);
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
