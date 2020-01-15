export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CARD'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'


export const removeCartItem = (productId) => {
    return {
        type: REMOVE_CART_ITEM,
        productID: productId
    }
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product: product
    }
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        pid: productId
    }
}

