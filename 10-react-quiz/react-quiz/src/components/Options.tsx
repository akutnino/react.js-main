function Options({ options }: { options: string[] }) {
	return (
		<div className='options'>
			{options.map((option: string, index: number) => {
				return (
					<button
						type='button'
						className='btn btn-option'
						key={index}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}

export default Options;
