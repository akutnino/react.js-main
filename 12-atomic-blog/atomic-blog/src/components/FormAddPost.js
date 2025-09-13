import { useContext, useState } from 'react';
import { PostContext } from './App.js';

function FormAddPost() {
	const { setPosts } = useContext(PostContext);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = (event) => {
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
