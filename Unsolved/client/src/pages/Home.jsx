import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateCategories, updateCurrentCategory, updateProducts } from '../redux/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

function Home({
  categories,
  currentCategory,
  updateCategories,
  updateCurrentCategory,
  updateProducts,
}) {
  const { loading: categoryLoading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { loading: productLoading, data: productData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (categoryData) {
      updateCategories(categoryData.categories);
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!categoryLoading) {
      idbPromise('categories', 'get').then((categories) => {
        updateCategories(categories);
      });
    }
  }, [categoryData, categoryLoading, updateCategories]);

  useEffect(() => {
    if (productData) {
      updateProducts(productData.products);
      productData.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!productLoading) {
      idbPromise('products', 'get').then((products) => {
        updateProducts(products);
      });
    }
  }, [productData, productLoading, updateProducts]);

  const handleClick = (id) => {
    updateCurrentCategory(id);
  };

  return (
    <div className="container">
      <CategoryMenu categories={categories} handleClick={handleClick} />
      <ProductList currentCategory={currentCategory} />
      <Cart />
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  updateCategories: (categories) => dispatch(updateCategories(categories)),
  updateCurrentCategory: (currentCategory) =>
    dispatch(updateCurrentCategory(currentCategory)),
  updateProducts: (products) => dispatch(updateProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
