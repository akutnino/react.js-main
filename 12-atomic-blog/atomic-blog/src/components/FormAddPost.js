import { useState } from 'react';

function FormAddPost({ setPosts }) {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = function (event) {
		event.preventDefault();
		if (!body || !title) return;
		setPosts({ title, body });
		setTitle('');
		setBody('');
	};

	const handleTitleInput = (event) => {
		setTitle(event.target.value);
	};

	const handleBodyInput = (event) => {
		setBody(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={handleTitleInput}
				placeholder='Post title'
			/>
			<textarea
				value={body}
				onChange={handleBodyInput}
				placeholder='Post body'
			/>
			<button>Add post</button>
		</form>
	);
}

export default FormAddPost;
