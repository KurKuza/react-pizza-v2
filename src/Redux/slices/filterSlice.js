import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating'
	}
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		}
	},
})
console.log(filterSlice.actions)

export const { setCategoryId } = filterSlice.actions

export default filterSlice.reducer