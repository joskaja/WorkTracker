import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import workSessionsService from './workSessionsService';

const DATE_FORMAT = 'DD.MM.YYYY';

export const loadWorkSessions = createAsyncThunk('workSession/load',
    async (_, thunkAPI) => {
        try {
            let { workSessions } = thunkAPI.getState();
            let data = await workSessionsService.loadWorkSessions(workSessions.date);
            return data;
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createWorkSession = createAsyncThunk('workSession/create',
    async (workSession, thunkAPI) => {
        try {
            return await workSessionsService.createWorkSession(workSession);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateWorkSession = createAsyncThunk('workSession/update',
    async (workSession, thunkAPI) => {
        try {
            return await workSessionsService.updateWorkSession(workSession);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteWorkSession = createAsyncThunk('workSession/delete',
    async (workSessionId, thunkAPI) => {
        try {
            return await workSessionsService.deleteWorkSession(workSessionId);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const workSessionsSlice = createSlice({
    name: 'workSession',
    initialState: {
        date: moment().format(DATE_FORMAT),
        workSessions: [],
        status: '',
        message: ''
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
        resetStatus: (state) => {
            state.status = '';
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWorkSessions.pending, (state) => {
                state.status = 'load_loading';
                state.workSessions = [];
            })
            .addCase(loadWorkSessions.fulfilled, (state, action) => {
                state.status = 'load_success';
                state.workSessions = action.payload;
            })
            .addCase(loadWorkSessions.rejected, (state, action) => {
                state.status = 'load_error';
                state.message = action.payload;
                state.workSessions = [];
            })
            .addCase(createWorkSession.pending, (state) => {
                state.status = 'create_loading';
            })
            .addCase(createWorkSession.fulfilled, (state, action) => {
                state.status = 'create_success';
                state.workSessions.push(action.payload);
            })
            .addCase(createWorkSession.rejected, (state, action) => {
                state.status = 'create_error';
                state.message = action.payload;
            })
            .addCase(updateWorkSession.pending, (state) => {
                state.status = 'update_loading';
            })
            .addCase(updateWorkSession.fulfilled, (state, action) => {
                state.status = 'update_success';
                let workSessionIndex = state.workSessions.findIndex((session) => session._id === action.payload._id);
                if (workSessionIndex > -1) {
                    state.workSessions[workSessionIndex] = action.payload;
                } else {
                    state.workSessions.push(action.payload);
                }
            })
            .addCase(updateWorkSession.rejected, (state, action) => {
                state.status = 'update_error';
                state.message = action.payload;
            })
            .addCase(deleteWorkSession.pending, (state) => {
                state.status = 'delete_loading';
            })
            .addCase(deleteWorkSession.fulfilled, (state, action) => {
                state.status = 'delete_success';
                state.message = action.payload.message;
                state.workSessions = state.workSessions.filter((session) => session._id !== action.payload.id)
            })
            .addCase(deleteWorkSession.rejected, (state, action) => {
                state.status = 'delete_error';
                state.message = action.payload;
            })
    }
})

export const { incrementDate, decrementDate, setDate, resetStatus } = workSessionsSlice.actions

export default workSessionsSlice.reducer