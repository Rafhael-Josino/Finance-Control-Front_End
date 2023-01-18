import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './style/index.css';
import './style/cryptocoinPage.css'
import './style/signMenus.css'
import App from './components/App';


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

/**
 loader: async () => {
     return redirect('/login');
 }
 * 
 */

const router = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    //<App />
    <RouterProvider router={router} />

);
