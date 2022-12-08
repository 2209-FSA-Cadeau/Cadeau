import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleCategory = createAsyncThunk(
    "shop/getSingleCategory",
    async (category) =>{
        try{
            console.log("CATEGORY", category)
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
    async (search) => {
        try{
            const {category, value} = search
            const response = await axios.get(`/api/recommendations/search?category=${category}&value=${value}`)
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
    singleProduct: {},
    filterView: [],
    filters: [],
    filterType: "",
    checklist: {ratings: undefined, prices: undefined, reviews: undefined}
}


const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        searchOff: (state) => {
            state.searchResults = []
        },
        filterOn: (state, action) =>{
            state.filterView = action.payload
        },
        filterOff: (state) => {
            state.filterView = []
        },
        addFilter: (state, action) => {
            state.filters.push(action.payload)
        },
        deleteFilters: (state) => {
            state.filters = []
        }, 
        deleteSingleFilter: (state, action) => {
            state.filters = state.filters.reduce((preV, currV) => {
                if(currV !== action.payload){
                    preV = [...preV, currV]
                    return preV
                } else {
                    return preV
                }
            }, [])
        },
        changeFilterType: (state, action) => {
            state.filterType = action.payload
        },
        addChecklist: (state, action) => {
            state.checklist = {...state.checklist, ...action.payload}
        },
        deleteChecklist: (state, action) => {
            for(let keys in state.checklist){
                if(keys === action.payload){
                    state.checklist[keys] = undefined
                }
            }
        },
        resetChecklist: (state) => {
            for(let keys in state.checklist){
                state.checklist[keys] = undefined
            }
        },
        resetFilterType: (state)  => {
            state.filterType = ""
        }
    },
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


export const {searchOff, filterOn, filterOff, addFilter, deleteFilters, deleteSingleFilter, changeFilterType, addChecklist, deleteChecklist, resetChecklist, resetFilterType} = shopSlice.actions
export default shopSlice.reducer
