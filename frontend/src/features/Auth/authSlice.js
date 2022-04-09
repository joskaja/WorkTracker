import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    status: '',
    message: ''
}

//Register user
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
//Login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout',
    async () => {
        return await authService.logout();
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.status = '';
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })

    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer