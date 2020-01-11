import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont();



const CartScreen = (props) => {

    const [activeRowKey, setActiveRowKey] = useState(null);

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

    // const swipeBtns = {
    //     autoClose: true,
    //     onClose: (sectionID, rowId, direction) => {
    //         //setActiveRowKey(this.props.chooseProduct.id)
    //     },
    //     onOpen: (sectionID, rowId, direction) => {

    //     },

    //     right: [
    //         {
    //             onPress: () => {
    //                 dispatch(cartActions.removeFromCart(chooseProduct.productId))
    //             },
    //             component: (
    //                 <View style={styles.trashSlide}>
    //                     <Icon
    //                         name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
    //                         size={23}
    //                         color='blue'
    //                     />
    //                 </View>
    //             ),
    //         }
    //     ],
    //     // rowId: this.props.index,
    //     // sectionID: 1
    //     //backgroundColor="transparent",
    // }



    const swipeBtns = [
        {
            component: (

                <View style={styles.trashSlide}>
                    <Icon
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='blue'
                    />
                </View>
            ),
            backgroundColor: 'white',
            //underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {

                dispatch(cartActions.removeFromCart(activeRowKey))
                //deleteNote(deleteProduct)
            },
        },
    ];

    const onSwipeOpen = (rowId, direction, key) => {

        if (typeof direction !== 'undefined') {

            setActiveRowKey(key)

            console.log(activeRowKey)
            console.log(key)

        }
    }

    const onSwipeClose = (rowId, direction, key) => {

        if (activeRowKey != null) {

            setActiveRowKey(null)

            console.log(direction)
            console.log(activeRowKey)


        }
    }
    const deleteNote = (productId) => {

        //add your custome logic to delete the array element with index.
        // this will temporary delete from the state.
        dispatch(cartActions.removeFromCart(productId))
    };
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
                //index={index}
                keyExtractor={item => item.productId}
                renderItem={(itemData, index) => (
                    <Swipeout
                        right={swipeBtns}
                        rowID={index}
                        //deleteProduct={itemData.item.productId}
                        sectionId={1}
                        autoClose={true}
                        onOpen={(secId, rowId, direction) => setActiveRowKey(itemData.item.productId)}
                        onClose={(secId, rowId, direction) => {
                            if (activeRowKey != null) {
                                setActiveRowKey(null)
                            }
                        }}
                        backgroundColor="transparent" >
                        <CartItem
                            index={index}
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                        />
                    </Swipeout>
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

    trashSlide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

    },

});

export default CartScreen;