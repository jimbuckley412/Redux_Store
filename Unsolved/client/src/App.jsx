// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Import your Redux reducers
import { StoreProvider } from './GlobalState'; // Import your GlobalState Provider
import Nav from './Nav'; // Import your Nav component

const store = createStore(combineReducers({ rootReducer }), applyMiddleware(thunk));

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StoreProvider>
          <Router>
            <Nav />
            <Outlet />
          </Router>
        </StoreProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
