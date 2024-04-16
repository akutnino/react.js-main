import Options from './Options';

export default function Question(props) {
	const { questionObject } = props;
	const { correctOption, question, options, id, points } = questionObject;

	console.log(questionObject);
	return (
		<div>
			<h4>{question}</h4>
			<Options options={options} />
		</div>
	);
}
