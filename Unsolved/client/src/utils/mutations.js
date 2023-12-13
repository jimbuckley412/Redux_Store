// mutationActions.js
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER_MUTATION = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// Action creators
export const loginAction = (email, password) => ({
  type: 'LOGIN',
  payload: { email, password },
});

export const addOrderAction = (products) => ({
  type: 'ADD_ORDER',
  payload: { products },
});

export const addUserAction = (firstName, lastName, email, password) => ({
  type: 'ADD_USER',
  payload: { firstName, lastName, email, password },
});
