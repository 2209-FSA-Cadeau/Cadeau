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
    }
})

export default shopSlice.reducer