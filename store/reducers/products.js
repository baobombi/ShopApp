import PRODUCTS from '../../data/dummy-data';
import { ADD_FAVORITE_PRODUCT, DELETE_PRODUCT } from '../actions/products';

const initialState = {

    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
    favoriteProduct: [],

};

export default (state = initialState, action) => {

    switch(action.type){

        case ADD_FAVORITE_PRODUCT : 
        const existingIndex = state.favoriteProduct.findIndex(prod => prod.id === action.productID)
        if (existingIndex >= 0){
            const updateFavoriteProduct = [...state.favoriteProduct]
            updateFavoriteProduct.splice(existingIndex, 1)
            return {...state, favoriteProduct: updateFavoriteProduct }
            
        }else {
            const createFavoriteProduct = state.availableProducts.find(prod => prod.id === action.productID)
            return { ...state,favoriteProduct: state.favoriteProduct.concat(createFavoriteProduct) }
        }

        case DELETE_PRODUCT :
            const userDeleteFavProduct = state.favoriteProduct.findIndex(prod => prod.id === action.pid)
            const updateFavoriteProduct = [...state.favoriteProduct]
            updateFavoriteProduct.splice(userDeleteFavProduct, 1)
            return {
                ...state,
                userProducts: state.userProducts.filter(product =>product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product =>product.id !== action.pid),
                favoriteProduct: updateFavoriteProduct
            }

    }
    return state;
};