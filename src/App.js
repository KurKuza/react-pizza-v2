import React from 'react'
import Categories from './components/Categories'
import './scss/app.scss'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'
import Skeleton from './components/PizzaBlock/Skeleton'

const pizzas = []


function App() {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		fetch('https://62939b5d7aa3e6af1a0e3954.mockapi.io/items')
			.then((res) => { return res.json() })
			.then(arr => (setItems(arr), setIsLoading(false)))
	}, [])

	return (
		<div className="App">
			<div className="wrapper">
				<Header />
				<div className="content">
					<div className="container">
						<div className="content__top">
							<Categories />
							<Sort />
						</div>
						<h2 className="content__title">Все пиццы</h2>
						<div className="content__items">
							{
								isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
