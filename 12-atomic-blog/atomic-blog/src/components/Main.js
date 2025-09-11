import FormAddPost from './FormAddPost.js';
import Posts from './Posts.js';

function Main({ posts, setPosts }) {
	return (
		<main>
			<FormAddPost setPosts={setPosts} />
			<Posts posts={posts} />
		</main>
	);
}

export default Main;
