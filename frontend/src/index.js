import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import productReducer, { productFetch } from './features/productSlice';
import { productsApi } from './features/productsApi';
import cartReducer, { getTotals } from './features/cartSlice';

const store= configureStore({
  reducer:{
    products:productReducer,
    cart:cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

store.dispatch(productFetch())
store.dispatch(getTotals())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
