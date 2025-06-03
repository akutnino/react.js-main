import { useEffect, useReducer } from 'react';
import {
	INITIAL_REACT_QUIZ_STATE,
	reactQuizReducer,
} from '../reducers/reactQuizReducer.ts';
import type { QuestionsArrayType } from '../types/components/types.ts';

import Header from './Header.tsx';
import MainContent from './MainContent.tsx';

function App() {
	const [state, dispatch] = useReducer(reactQuizReducer, INITIAL_REACT_QUIZ_STATE);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const fetchURL: string = `http://localhost:8000/questions`;
				const fetchOptions: RequestInit = {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Failed Fetch Request');

				const data: QuestionsArrayType = await response.json();
				dispatch({
					type: 'dataReceived',
					payload: data,
				});
			} catch (error) {
				if (error instanceof Error) {
					dispatch({
						type: 'dataFailed',
						payload: error.message,
					});
				}
			}
		};

		fetchQuestions();
	}, []);

	return (
		<div className='app'>
			<Header />

			<MainContent>
				<p>1/15</p>
				<p>Questions</p>
			</MainContent>
		</div>
	);
}

export default App;
