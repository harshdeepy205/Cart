import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    items:[],
    status:null,
    error:null
}

export const productFetch=createAsyncThunk(
    "products/productFetch",
    async(id=null,{rejectWithValue})=>{
        try {
            const response= await axios.get("http://localhost:5000/products")
            return response?.data
        } catch (error) {
            return rejectWithValue("an error occured")
        }
      
    }
)

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:{
        [productFetch.pending]:(state,action)=>{
            state.status="pending"
        },
        [productFetch.fulfilled]:(state,action)=>{
            state.action = "success"
            state.items=action.payload
        },
        [productFetch.rejected]:(state,action)=>{
            state.action="rejected"
            state.error=action.payload
        }
    }
})

export default productSlice.reducer