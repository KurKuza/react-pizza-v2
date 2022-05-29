import React from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

function Categories() {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const onClickCategory = (i) => {
		setActiveIndex(i)
	}

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, i) => (
					<li
						onClick={() => onClickCategory(i)}
						className={activeIndex === i ? 'active' : ''}>
						{value}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
