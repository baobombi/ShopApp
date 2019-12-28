import React from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    YellowBox,
    Platform,
    Alert,
    Button
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'

console.disableYellowBox = true;



const ProductOverViewScreen = (props) => {

    const seletectItemHandler = (id, title) => {

        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
    }

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
                    onSelect={() => {
                        seletectItemHandler(itemData.item.id, itemData.item.title)
                    }}

                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            seletectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add To Cart"
                        onPress={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                    />
                </ProductItem>
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
                navData.navigation.navigate({ routeName: 'Cart' });
            }}
        />,
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,

    };

}

const styles = StyleSheet.create({


});

export default ProductOverViewScreen