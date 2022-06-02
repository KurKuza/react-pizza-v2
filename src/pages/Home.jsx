import React from 'react'

import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Categories from '../components/Categories'

function Home() {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		fetch('https://62939b5d7aa3e6af1a0e3954.mockapi.io/items')
			.then((res) => {
				return res.json()
			})
			.then((arr) => (setItems(arr), setIsLoading(false)))
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
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
