// Cart.jsx
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { connect, useDispatch, useSelector } from 'react-redux'; // Import connect and hooks
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { toggleCart, addMultipleToCart } from '../../utils/actions'; // Import Redux actions
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = ({ cart, cartOpen }) => {
  const dispatch = useDispatch();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cartData = await idbPromise('cart', 'get');
      dispatch(addMultipleToCart(cartData)); // Dispatch action to update the cart in Redux
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={() => dispatch(toggleCart())}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={() => dispatch(toggleCart())}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  cartOpen: state.cartOpen,
});

export default connect(mapStateToProps)(Cart);
