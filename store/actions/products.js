export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT' 

export const addFavoriteProduct = (id)  =>{
        return {
            type: ADD_FAVORITE_PRODUCT,
            productID: id,
        }
}