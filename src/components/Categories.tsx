import React from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

type CategoriesProps = {
	value: number
	onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
