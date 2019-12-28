export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT' 

export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const addFavoriteProduct = (id)  =>{
        return {
            type: ADD_FAVORITE_PRODUCT,
            productID: id,
        }
}

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}