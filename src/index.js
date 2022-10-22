import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import './index.css'
import App from './components/App';
import reducers from './reducers'


/**
 * 
 //const store = configureStore(reducers, applyMiddleware(thunk));
const store = configureStore({ reducer: reducers})

    <Provider store={store}>
      <App />
    </Provider>
 */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
