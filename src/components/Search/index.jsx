import React from 'react'

import styles from './Search.module.scss'

function Search() {
	return (
		<div>
			<svg
				style='enable-background:new 0 0 16 16;'
				version='1.1'
				viewBox='0 0 16 16'
				xml:space='preserve'
				xmlns='http://www.w3.org/2000/svg'
				xmlns:xlink='http://www.w3.org/1999/xlink'>
				<g id='Guide' />
				<g id='Layer_2'>
					<path d='M13.85,13.15l-2.69-2.69c0.74-0.9,1.2-2.03,1.2-3.28C12.37,4.33,10.04,2,7.18,2S2,4.33,2,7.18s2.33,5.18,5.18,5.18   c1.25,0,2.38-0.46,3.28-1.2l2.69,2.69c0.1,0.1,0.23,0.15,0.35,0.15s0.26-0.05,0.35-0.15C14.05,13.66,14.05,13.34,13.85,13.15z    M3,7.18C3,4.88,4.88,3,7.18,3s4.18,1.88,4.18,4.18s-1.88,4.18-4.18,4.18S3,9.49,3,7.18z' />
				</g>
			</svg>
			<input className={styles.root} placeholder='Поиск пиццы..' />
		</div>
	)
}

export default Search