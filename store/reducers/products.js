import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_FAVORITE_PRODUCT,
  SET_FILTERS,
  SET_PRODUCT
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
  favoriteProduct: [],
  userProducts: []
};

export default (state = initialState, action) => {

  switch (action.type) {

    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
      }

    case ADD_FAVORITE_PRODUCT:
      const existingIndex = state.favoriteProduct.findIndex(product => product.id === action.productID)

      if (existingIndex >= 0) {
        const updateFavProduct = [...state.favoriteProduct]
        updateFavProduct.splice(existingIndex, 1)
        return { ...state, favoriteProduct: updateFavProduct }
      } else {
        const product = state.availableProducts.find(pro => pro.id === action.productID)
        return { ...state, favoriteProduct: state.favoriteProduct.concat(product) }
      }

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );

      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};
