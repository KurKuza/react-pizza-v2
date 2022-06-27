import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

import { store } from './Redux/store'
import { Provider } from 'react-redux'

export const SearchContext = React.createContext('')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			<Provider store={store}>
				<App />
			</Provider>
		</SearchContext.Provider>
	</BrowserRouter>,
)
