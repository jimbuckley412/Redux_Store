import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { connect } from 'react-redux';
import { updateProducts } from '../../redux/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList({ currentCategory, products, updateProducts }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      updateProducts(data.products);
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((cachedProducts) => {
        updateProducts(cachedProducts);
      });
    }
  }, [data, loading, updateProducts]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentCategory: state.currentCategory,
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  updateProducts: (products) => dispatch(updateProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
