import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    data: [],
    error: '',
    searchData: [],
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        editData: (state, action) => {
            const { id, newData } = action.payload;

            const index = state.data.findIndex(item => item.id === id);

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    ...newData
                }
            }
        },
        deleteData: (state, action) => {
            const { id } = action.payload;

            state.searchData = state.searchData.filter(item => item.id !== id);
            state.data = state.data.filter(item => item.id !== id);

        },
        fetchSearchData: (state, action) => {
            const { keyword } = action.payload;
            state.searchData = state.data.filter(item =>
                item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                item.email.toLowerCase().includes(keyword.toLowerCase()) ||
                item.role.toLowerCase().includes(keyword.toLowerCase())
            );
        },
        deletePageData: (state, action) => {
            const { idsToDelete } = action.payload;
            state.data = state.data.filter(item => !idsToDelete.includes(item.id));
            state.searchData = state.searchData.filter(item => !idsToDelete.includes(item.id));
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { editData, deleteData, fetchSearchData,deletePageData } = dataSlice.actions;


export default dataSlice.reducer;