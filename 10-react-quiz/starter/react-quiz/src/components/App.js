import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StarScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';

const initialState = {
	questions: [],
	status: 'loading',
	questionIndex: 0,
	questionAnswer: null,
	points: 0
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				status: 'ready',
				questions: action.payload
			};

		case 'dataFailed':
			return {
				...state,
				status: 'error'
			};

		case 'startQuiz':
			return {
				...state,
				status: 'active'
			};

		case 'newAnswer':
			const currentQuestion = state.questions.at(state.questionIndex);

			return {
				...state,
				questionAnswer: action.payload,
				points:
					currentQuestion.correctOption === action.payload
						? state.points + currentQuestion.points
						: state.points
			};

		case 'nextQuestion':
			return {
				...state,
				questionIndex: state.questionIndex + 1,
				questionAnswer: null
			};

		default:
			throw new Error('Unknown Action');
	}
};

export default function App(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, questionIndex, questionAnswer } = state;
	const totalQuizQuestions = questions.length;

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

			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StarScreen
						totalQuizQuestions={totalQuizQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<Question
							questionObject={questions.at(questionIndex)}
							dispatch={dispatch}
							questionAnswer={questionAnswer}
						/>
						<NextButton
							dispatch={dispatch}
							questionAnswer={questionAnswer}
						/>
					</>
				)}
			</Main>
		</div>
	);
}
