import React from 'react'
import Colors from '../../constants/Colors'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    Platform,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card';



const CartScreen = (props) => {

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
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}> Total: <Text style={styles.amount}>${cartToAmount.toFixed(2)}</Text></Text>
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
                    onPress={() => {

                        dispatch(ordersActions.addOrder(cartItems, cartToAmount))
                    }}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
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


});

export default CartScreen;