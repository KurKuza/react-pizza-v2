import React from 'react'
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
import { fetchPizzas } from '../Redux/slices/pizzaSlice'

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { items, status } = useSelector((state) => state.pizza)
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
	const sortType = sort.sortProperty


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

	const getPizzas = async () => {
		dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }))
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
			getPizzas()
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
			{status === 'error' ? (
				<div style={{ margin: 2 + 'em', textAlign: 'center' }}>
					<h1>
						<span>Произошла ошибка 😕</span>
						<br />
						<p>
							К сожалению, не удалось получить пиццы <br />
							(ಥ﹏ಥ)
							<br /> попробуйте пожалуйста позже
						</p>
					</h1>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
