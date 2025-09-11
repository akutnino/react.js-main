function List({ posts }) {
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

export default List;
