import React from 'react'

import styles from './NotFoundBlock.module.scss'
console.log('> styles', styles)

function NotFoundBlock() {
	return (
			<h1 className={styles.root}>
				<span>😕</span>
				<br/>
				Ничего не найдено
				<p className={styles.description}>Нет такой страницы ¯\_(ツ)_/¯</p>
			</h1>
	)
}

export default NotFoundBlock