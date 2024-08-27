import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

const lazyLoadedPosts = (length) => Array.from(Array(length), () => createRandomPost());

function App() {
	const [posts, setPosts] = useState(lazyLoadedPosts(30));
	const [searchQuery, setSearchQuery] = useState('');
	const [isFakeDark, setIsFakeDark] = useState(false);

	const filteredPosts = posts.filter((postObject) => {
		const titleStringsArray = postObject.title.toLowerCase().split(' ');
		const bodyStringsArray = postObject.body.toLowerCase().split(' ');
		const postContentsArray = [...titleStringsArray, ...bodyStringsArray];

		return postContentsArray.includes(searchQuery.toLowerCase());
	});

	const searchedPosts = searchQuery.length > 0 ? filteredPosts : posts;

	const handleThemeToggle = () => {
		setIsFakeDark((isDarkTheme) => !isDarkTheme);
	};

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

			<Header
				posts={searchedPosts}
				setPosts={setPosts}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<Main
				posts={searchedPosts}
				setPosts={setPosts}
			/>
			<Archive setPosts={setPosts} />
			<Footer />
		</section>
	);
}

function Header(props) {
	const { posts, setPosts, searchQuery, setSearchQuery } = props;

	const handleClearPosts = () => {
		setPosts([]);
	};

	return (
		<header>
			<h1>
				<span>⚛️</span>The Atomic Blog
			</h1>
			<div>
				<Results posts={posts} />
				<SearchPosts
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<button onClick={handleClearPosts}>Clear posts</button>
			</div>
		</header>
	);
}

function SearchPosts(props) {
	const { searchQuery, setSearchQuery } = props;

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

function Results(props) {
	const { posts } = props;

	return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main(props) {
	const { posts, setPosts } = props;

	return (
		<main>
			<FormAddPost setPosts={setPosts} />
			<Posts posts={posts} />
		</main>
	);
}

function Posts(props) {
	const { posts } = props;

	return (
		<section>
			<List posts={posts} />
		</section>
	);
}

function FormAddPost(props) {
	const { setPosts } = props;
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = function (event) {
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

function List(props) {
	const { posts } = props;

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

function Archive(props) {
	const { setPosts } = props;
	const [posts] = useState(lazyLoadedPosts(1000));
	const [showArchive, setShowArchive] = useState(false);

	const handleArchiveToggle = () => {
		setShowArchive((isArchiveOpen) => !isArchiveOpen);
	};

	const handleAddPost = (newPost) => {
		return () => setPosts((currentPosts) => [newPost, currentPosts]);
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
}

function Footer() {
	return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
