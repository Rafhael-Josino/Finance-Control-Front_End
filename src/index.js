import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route
}from 'react-router-dom'


import './index.css'
import App from './components/App';
import ErrorPage from './error-page';


/**
 import { Provider } from 'react-redux';
 import { applyMiddleware } from 'redux';
 import { configureStore } from '@reduxjs/toolkit';
 import thunk from 'redux-thunk'
 * 
 import reducers from './reducers'

 //const store = configureStore(reducers, applyMiddleware(thunk));
const store = configureStore({ reducer: reducers})

    <Provider store={store}>
      <App />
    </Provider>
 */

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
]);

/**
 * 
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<App />
    <RouterProvider router={router} />

);
