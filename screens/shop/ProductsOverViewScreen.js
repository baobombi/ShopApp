import React from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    YellowBox,
    Platform,
    Alert
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import IconHeader from '../../components/UI/IconHeader';




console.disableYellowBox = true;

const ProductOverViewScreen = (props) => {


    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
    return (
        <FlatList
            data={products}
            //numColumns={2}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate({
                            routeName: 'ProductDetail',
                            params: {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title,
                            }
                        })
                    }}
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }}
                />

            }
        />

    )
}
ProductOverViewScreen.navigationOptions = navData => {

    return {
        headerTitle: 'All Products',
        headerRight: <IconHeader
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onTapped={() => {
                navData.navigation.navigate({ routeName: 'Cart'});
            }}
        />

    };

}

const styles = StyleSheet.create({


});

export default ProductOverViewScreen