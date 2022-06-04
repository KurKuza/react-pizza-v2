import React from 'react'

import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Categories from '../components/Categories'

function Home() {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [categoryId, setCategoryId] = React.useState(0)
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sortType.sortProperty.replace('-', '')
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

	// items?sortBy=price
	React.useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://62939b5d7aa3e6af1a0e3954.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
		)
			.then((res) => {
				return res.json()
			})
			.then((arr) => {
				setItems(arr)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={(i) => setCategoryId(i)}
				/>
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	)
}

export default Home
