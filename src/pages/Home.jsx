import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId } from '../Redux/slices/filterSlice'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Categories from '../components/Categories'
import Pagination from '../components/Search/Pagination/Pagination'
import { SearchContext } from '../App'

<<<<<<< HEAD
function Home() {
	const dispatch = useDispatch()
	const {categoryId, sort} = useSelector((state) => state.filter.categoryId)
	const sortType = sort.sortProperty
	// const sortType = useSelector((state) => state.filter.sort.sortProperty)
=======
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../Redux/slices/filterSlice'

function Home() {
	const dispatch = useDispatch()
	const categoryId = useSelector((state) => state.filter.categoryId)

	const setCategoryId = () => {}
>>>>>>> ce85713f8d929a7242e076291e9e8fcb7a4ca25c

	console.log('id category', categoryId)

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [currentPage, setCurrentPage] = React.useState(1)

	const onClickCategory = (id) => {
<<<<<<< HEAD
=======
		console.log(id)
>>>>>>> ce85713f8d929a7242e076291e9e8fcb7a4ca25c
		dispatch(setCategoryId(id))
	}

	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sortType.replace('-', '')
	const order = sortType.includes('-') ? 'asc' : 'desc'
	const search = searchValue ? `&search=${searchValue}` : ''

	React.useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://62939b5d7aa3e6af1a0e3954.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then((res) => {
				return res.json()
			})
			.then((arr) => {
				setItems(arr)
				setIsLoading(false)
			})
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
<<<<<<< HEAD
				<Sort />
=======
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
>>>>>>> ce85713f8d929a7242e076291e9e8fcb7a4ca25c
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	)
}

export default Home
