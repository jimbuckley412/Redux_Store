// index.jsx
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './yourReduxStore'; // Import your Redux store

import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    ),
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/orderHistory',
        element: <OrderHistory />,
      },
      {
        path: '/products/:id',
        element: <Detail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
