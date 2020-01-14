import React, { useState, useEffect, useCallback } from 'react'
import {
    FlatList,
    Platform,
    Button,
    ActivityIndicator,
    View,
    StyleSheet,
    Text
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'

console.disableYellowBox = true;

const ProductOverViewScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [loadProducts])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts)
        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])

    const seletectItemHandler = (id, title) => {

        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error Occured!!</Text>
                <Button title='Try Again' onPress={loadProducts} color={Colors.primary} />
            </View>
        )
    }
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
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
        headerBackTitle: 'Back'

    };

}

const styles = StyleSheet.create({

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
});

export default ProductOverViewScreen