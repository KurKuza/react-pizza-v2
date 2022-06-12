import React from 'react'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

function Search() {
	const [value, setValue] = React.useState('')
	const { setSearchValue } = React.useContext(SearchContext)
	const inputRef = React.useRef()

	const onClickClear = () => {
		setValue('')
		inputRef.current.focus()
	}

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			setSearchValue(str)
			console.log('searchValue', str);
		}, 1000),
		[],
	)

	const onChangeInput = (event) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns='http://www.w3.org/2000/svg'
				version='1.1'
				viewBox='0 0 16 16'>
				<g id='Guide' />
				<g id='Layer_2'>
					<path d='M13.85,13.15l-2.69-2.69c0.74-0.9,1.2-2.03,1.2-3.28C12.37,4.33,10.04,2,7.18,2S2,4.33,2,7.18s2.33,5.18,5.18,5.18   c1.25,0,2.38-0.46,3.28-1.2l2.69,2.69c0.1,0.1,0.23,0.15,0.35,0.15s0.26-0.05,0.35-0.15C14.05,13.66,14.05,13.34,13.85,13.15z    M3,7.18C3,4.88,4.88,3,7.18,3s4.18,1.88,4.18,4.18s-1.88,4.18-4.18,4.18S3,9.49,3,7.18z' />
				</g>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы..'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					enableBackground='new 0 0 32 32'
					height='32px'
					id='Слой_1'
					version='1.1'
					viewBox='0 0 32 32'
					width='32px'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z'
						fill='#121313'
						id='Close'
					/>
					<g />
					<g />
					<g />
					<g />
					<g />
					<g />
				</svg>
			)}
		</div>
	)
}

export default Search
