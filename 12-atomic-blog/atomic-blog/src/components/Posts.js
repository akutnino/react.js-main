import List from './List.js';

function Posts({ posts }) {
	return (
		<section>
			<List posts={posts} />
		</section>
	);
}

export default Posts;
