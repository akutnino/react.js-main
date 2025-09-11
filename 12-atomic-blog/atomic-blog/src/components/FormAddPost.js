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

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Post title'
			/>
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder='Post body'
			/>
			<button>Add post</button>
		</form>
	);
}

export default FormAddPost;
