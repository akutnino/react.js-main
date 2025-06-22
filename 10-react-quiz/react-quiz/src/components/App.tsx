import { useEffect, useReducer } from 'react';
import {
	INITIAL_REACT_QUIZ_STATE,
	reactQuizReducer,
} from '../reducers/reactQuizReducer.ts';
import type {
	InitalReactQuizType,
	QuestionsArrayType,
	QuestionType,
} from '../types/components/types.ts';

import Header from './Header.tsx';
import MainContent from './MainContent.tsx';
import Loader from './Loader.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import StartScreen from './StartScreen.tsx';
import Question from './Question.tsx';
import Button from './Button.tsx';
import Progress from './Progress.tsx';
import FinishScreen from './FinishScreen.tsx';
import Footer from './Footer.tsx';
import Timer from './Timer.tsx';

function App() {
	const [state, dispatch] = useReducer(reactQuizReducer, INITIAL_REACT_QUIZ_STATE);
	const {
		questions,
		status,
		questionIndex,
		userAnswerIndex,
		userTotalPoints,
		userHighscore,
		quizTimeRemaining,
	}: InitalReactQuizType = state;
	const totalQuestions: number = questions.length;
	const isQuestionAnswered: boolean =
		userAnswerIndex !== null && Number.isInteger(userAnswerIndex);
	const maxPossiblePoints: number = questions.reduce(
		(acc: number, curr: QuestionType) => curr.points + acc,
		0
	);
	const isLastQuestion: boolean = questionIndex + 1 === totalQuestions;

	const handleClick = () => {
		if (isLastQuestion) {
			dispatch({
				type: 'finishQuiz',
			});
		} else {
			dispatch({
				type: 'nextQuestion',
			});
		}
	};

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
		<div
			className='app'
			data-testid='container'
		>
			<Header />

			<MainContent>
				{status === 'loading' && <Loader />}
				{status === 'ready' && (
					<StartScreen
						totalQuestions={totalQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<Progress
							questionIndex={questionIndex}
							totalQuestions={totalQuestions}
							userTotalPoints={userTotalPoints}
							maxPossiblePoints={maxPossiblePoints}
							userAnswerIndex={userAnswerIndex}
						/>

						<Question
							question={questions[questionIndex]}
							userAnswerIndex={userAnswerIndex}
							dispatch={dispatch}
						/>

						<Footer>
							<Timer
								quizTimeRemaining={quizTimeRemaining}
								dispatch={dispatch}
							/>

							{isQuestionAnswered && (
								<Button onClick={handleClick}>
									{isLastQuestion ? 'Finish Quiz' : 'Next'}
								</Button>
							)}
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						userTotalPoints={userTotalPoints}
						maxPossiblePoints={maxPossiblePoints}
						userHighscore={userHighscore}
						dispatch={dispatch}
					/>
				)}
				{status === 'error' && <ErrorMessage />}
			</MainContent>
		</div>
	);
}

export default App;
