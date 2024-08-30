import { memo, useEffect, useState } from 'react';
import { PostProvider, usePost } from './PostContext';

function App() {
	const [isFakeDark, setIsFakeDark] = useState(false);

	const handleThemeToggle = () => {
		setIsFakeDark((isDarkTheme) => !isDarkTheme);
	};

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(() => {
		document.documentElement.classList.toggle('fake-dark-mode');
	}, [isFakeDark]);

	return (
		<section>
			<button
				onClick={handleThemeToggle}
				className='btn-fake-dark-mode'
			>
				{isFakeDark ? '☀️' : '🌙'}
			</button>

			<PostProvider>
				<Header />
				<Main />
				<Archive />
				<Footer />
			</PostProvider>
		</section>
	);
}

function Header() {
	const { setPosts } = usePost();

	const handleClearPosts = () => {
		setPosts([]);
	};

	return (
		<header>
			<h1>
				<span>⚛️</span>The Atomic Blog
			</h1>
			<div>
				<Results />
				<SearchPosts />
				<button onClick={handleClearPosts}>Clear posts</button>
			</div>
		</header>
	);
}

function SearchPosts() {
	const { searchQuery, setSearchQuery } = usePost();

	const handleSearchInput = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<input
			value={searchQuery}
			onChange={handleSearchInput}
			placeholder='Search posts...'
		/>
	);
}

function Results() {
	const { posts } = usePost();

	return <p>🚀 {posts.length} atomic posts found</p>;
}

const Main = memo(function Main() {
	return (
		<main>
			<FormAddPost />
			<Posts />
		</main>
	);
});

function Posts() {
	return (
		<section>
			<List />
		</section>
	);
}

function FormAddPost() {
	const { setPosts } = usePost();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!body || !title) return;

		setPosts((currentPosts) => [{ title, body }, ...currentPosts]);
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
			<button type='submit'>Add post</button>
		</form>
	);
}

function List() {
	const { posts } = usePost();

	return (
		<ul>
			{posts.map((post, index) => (
				<li key={index}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	);
}

const Archive = memo(function Archive() {
	const { setPosts, lazyLoadedPosts } = usePost();
	const [posts] = useState(lazyLoadedPosts(1000));
	const [showArchive, setShowArchive] = useState(false);

	const handleArchiveToggle = () => {
		setShowArchive((isArchiveOpen) => !isArchiveOpen);
	};

	const handleAddPost = (postObject) => {
		return () => setPosts((currentPosts) => [postObject, ...currentPosts]);
	};

	return (
		<aside>
			<h2>Post archive</h2>
			<button onClick={handleArchiveToggle}>
				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
			</button>

			{showArchive && (
				<ul>
					{posts.map((post, index) => (
						<li key={index}>
							<p>
								<strong>{post.title}:</strong> {post.body}
							</p>
							<button onClick={handleAddPost(post)}>Add as new post</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
});

function Footer() {
	return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
