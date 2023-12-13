import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { addToCart, updateCartQuantity } from '../../redux/actions';

function ProductItem({ item, cart, addToCart, updateCartQuantity }) {
  const { image, name, _id, price, quantity } = item;

  const itemInCart = cart.find((cartItem) => cartItem._id === _id);

  const handleAddToCart = () => {
    if (itemInCart) {
      updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1);
    } else {
      addToCart({ ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize('item', quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
  updateCartQuantity: (productId, quantity) =>
    dispatch(updateCartQuantity(productId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
