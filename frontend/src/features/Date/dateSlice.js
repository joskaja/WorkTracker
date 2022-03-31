import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const DATE_FORMAT = 'DD.MM.YYYY';

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        date: moment().format(DATE_FORMAT),
    },
    reducers: {
        incrementDate: (state) => {
            state.date = moment(state.date, DATE_FORMAT).add(1, 'day').format(DATE_FORMAT);
        },
        decrementDate: (state) => {
            state.date = moment(state.date, DATE_FORMAT).subtract(1, 'day').format(DATE_FORMAT);
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementDate, decrementDate, setDate } = dateSlice.actions

export default dateSlice.reducer