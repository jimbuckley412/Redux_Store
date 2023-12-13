export const updateProducts = (products) => ({
    type: 'UPDATE_PRODUCTS',
    payload: products,
});
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
});
export const addMultipleToCart = (products) => ({
    type: 'ADD_MULTIPLE_TO_CART',
    payload: products,
});
export const removeFromCart = (product) => ({
    type: 'REMOVE_FROM_CART',
    payload: product,
});
export const clearCart = () => ({
    type: 'CLEAR_CART',
});
export const updateCartQuantity = (product, quantity) => ({
    type: 'UPDATE_CART_QUANTITY',
    payload: { product, quantity },
});
export const toggleCart = () => ({
    type: 'TOGGLE_CART',
});
export const updateCategories = (categories) => ({
    type: 'UPDATE_CATEGORIES',
    payload: categories,
});
export const updateCurrentCategory = (currentCategory) => ({
    type: 'UPDATE_CURRENT_CATEGORY',
    payload: currentCategory,
});