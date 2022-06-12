import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId } from '../Redux/slices/filterSlice'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'

function Home() {
	const dispatch = useDispatch()
	const { categoryId, sort } = useSelector((state) => state.filter)
	const sortType = sort.sortProperty

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [currentPage, setCurrentPage] = React.useState(1)

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sortType.replace('-', '')
	const order = sortType.includes('-') ? 'asc' : 'desc'
	const search = searchValue ? `&search=${searchValue}` : ''

	React.useEffect(() => {
		setIsLoading(true)
		// axios
		// 	.get(
		// 		`https://62939b5d7aa3e6af1a0e3954.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		// 	)
		// 	.then((res) => {
		// 		setItems(res.data)
		// 		setIsLoading(false)
		// 	})
		window.scrollTo(0, 0)
	}, [category, sortType, searchValue, currentPage])

	const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}

			return false
		})
		.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	)
}

export default Home
