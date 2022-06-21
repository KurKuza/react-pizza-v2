import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../Redux/slices/filterSlice'
import PizzaBlock from '../components/PizzaBlock'
import Sort, { sortList } from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
	const sortType = sort.sortProperty

	const { searchValue } = React.useContext(SearchContext)
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sortType.replace('-', '')
	const order = sortType.includes('-') ? 'asc' : 'desc'
	const search = searchValue ? `&search=${searchValue}` : ''

	const fetchPizzas = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(
				`https://62939b5d7aa3e6af1a0e3954.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
			)
			setItems(res.data)
			setIsLoading(false)
		} catch (err) {
		}
			
	}

	//Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [category, sortType, currentPage])

	//Если был первый рендер, то проверяем url-параметры и сохраняем в редуксе
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty,
			)

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			)
			isSearch.current = true
		}
	}, [])

	//Если был первый рендер, запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
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
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
