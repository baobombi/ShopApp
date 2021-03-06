import Product from '../../models/product'

export const ADD_FAVORITE_PRODUCT = 'ADD_FAVORITE_PRODUCT'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const SET_FILTERS = 'SET_FILTERS'

export const SET_PRODUCT = 'SET_PRODUCT'


export const fetchProducts = () => {

    return async dispatch => {

        try {
            const response = await fetch('https://rn-shopapp-4686f.firebaseio.com/products.json', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Some thing went wrong!')
            }
            const resData = await response.json()
            //console.log(resData)

            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
            }

            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts
            })
        } catch (err) {
            throw err
        }
    }
}

export const setFilters = (fiterSettings) => {

    return {
        type: SET_FILTERS,
        filters: fiterSettings
    }
}
export const addFavoriteProduct = (id) => {

    return {
        type: ADD_FAVORITE_PRODUCT,
        productID: id,
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(`https://rn-shopapp-4686f.firebaseio.com/products/${productId}.json`,
            {
                method: 'DELETE',
            })

            if (!response.ok){
                throw new Error('Some thing went wrong!')
            }
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}

export const createProduct = (title, description, imageUrl, price) => {

    return async dispatch => {

        const response = await fetch('https://rn-shopapp-4686f.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        if(!response.ok){
            throw new Error('Some thing went wrong!!!!!')
        }
        const resData = await response.json()

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        })
    }
}
export const updateProduct = (id, title, description, imageUrl) => {

    return async dispatch => {
        const response = await fetch(
            `https://rn-shopapp-4686f.firebaseio.com/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            }
        );
        if (!response.ok) {
            throw new Error('Some thing went wrong!!!!!')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };
};

