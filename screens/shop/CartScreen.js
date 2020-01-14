import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

Icon.loadFont();


const CartScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const cartToAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {

            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
        return;
    })
    const dispatch = useDispatch();

    const sendOrderHandle = async () => {
        setIsLoading(true)
        await dispatch(ordersActions.addOrder(cartItems, cartToAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}> Total: <Text style={styles.amount}>${cartToAmount.toFixed(2)}</Text></Text>
                {isLoading ? <View style={styles.viewLoad}>
                    <ActivityIndicator size='small' color={Colors.primary} />
                </View> :
                    <Button
                        color={Colors.accent}
                        title='Order Now '
                        disabled={cartItems.length === 0}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'ProductDetail',
                                params: {
                                    productId: itemData.item.id,
                                    productTitle: itemData.item.title,
                                }
                            })
                        }}
                        onPress={sendOrderHandle}
                    />
                }
            </Card>

            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={(itemData) => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onDeleteProductItem={() => dispatch(cartActions.removeCartItem(itemData.item.productId))}
                        onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />
                )}
            />
        </View>
    );
};
CartScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Cart',
    }
}

const styles = StyleSheet.create({

    viewLoad: {
        marginRight: 10,
    },

    screen: {
        margin: 20,
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10
    },

    summaryText: {
        fontSize: 18
    },

    amount: {
        color: Colors.primary
    },

    trashSlide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

});

export default CartScreen;