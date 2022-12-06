import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleCategory = createAsyncThunk(
    "shop/getSingleCategory",
    async (category) =>{
        try{
            const response = await axios.get(`/api/recommendations/${category}`)
            const recommendations = response.data
            recommendations.query = category
            return recommendations
        } catch(error) {
            console.log(error)
        }
    }
)

export const getSearchResults = createAsyncThunk(
    "shop/getSearchResults",
    async (category) =>{
        try{
            const response = await axios.get(`/api/recommendations/${category}`)
            const recommendations = response.data
            return recommendations
        } catch(error) {
            console.log(error)
        }
    }
)

export const getSingleItem = createAsyncThunk(
    "shop/getSingleItem",
    async (productId) => {
        try {
            const response = await axios.get(`/api/recommendations/singleitem/${productId}`);
            const product = response.data;
            return product
        } catch (error) {
            console.log(error)
        }
    }
)

export const clearSingleItem = createAsyncThunk(
    "shop/clearSingleItem",
    async () => {
        try {
            const product = {};
            return product
        } catch (error) {
            console.log(error)
        }
    }
)


const initialState = {
    categories:{
        Books: [],
        Electronics: [],
        Cooking: [],
        Sports: [],
        Outdoors: [],
        Clothing: [],
        Music: [],
        Movies: [],
        Technology: [],
        Games: [],
        Pets: [],
        Home: [],
        Art: []
    },
    searchResults: [],
    singleProduct: {}
}


const shopSlice = createSlice({
    name: "shop",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSingleCategory.fulfilled, (state, action) => {
                if(state.categories[action.payload.query].length === 0){
                    state.categories[action.payload.query] = action.payload.shopping_results
                } else {
                    state.categories[action.payload.query] = [...state.categories[action.payload.query], ...action.payload.shopping_results]
                }
                })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.searchResults = action.payload.shopping_results
                })
            .addCase(getSingleItem.fulfilled, (state, action) => {
                state.singleProduct = action.payload
            })
            .addCase(clearSingleItem.fulfilled, (state, action) => {
                state.singleProduct = action.payload
            })
    }
})

export default shopSlice.reducer
