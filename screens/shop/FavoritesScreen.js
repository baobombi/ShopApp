import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Platform,
    Button

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'

const FavoritesScreen = (props) => {

    const favoriteProduct = useSelector(state => state.products.favoriteProduct)
    const dispatch = useDispatch()

    const seletectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
    }
    if (favoriteProduct.length === 0 || !favoriteProduct) {
        return <View style={styles.container}>
            <Text style={styles.textView}>No Favorite meals found. Start adding some!</Text>
        </View>
    } else {
        return (

            <FlatList
                data={favoriteProduct}
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
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textView: {
        fontSize: 17
    }

})
FavoritesScreen.navigationOptions = navData => {
    return {

        headerBackTitle: 'Back',
        headerTitle: 'Favorites',
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,
        // headerRight: <IconHeader
        //     name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        //     onTapped={() => {
        //         //navData.navigation.navigate({ routeName: 'Cart' });
        //     }}
        // />,
    }
}

export default FavoritesScreen