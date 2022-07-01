import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { category, sortBy, order, search, currentPage } = params
		const { data } = await axios.get(
			`https://62939b5d7aa3e6af1a0e3954.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', //loading | succsess | error
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		}
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading'
			state.items = []
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'succsess'
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = 'error'
			state.items = []
		},
	}
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer