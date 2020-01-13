import React from 'react'
import {

    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Animated,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const LeftActions = ({ progress, dragX, onPressDelete }) => {

    const scale = dragX.interpolate({

        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'

    })
    return (
        <TouchableOpacity onPress={onPressDelete}>
            <View style={styles.trashSlide}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Delete</Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

const CartItem = (props) => {

const { onDeleteProductItem} = props

    const alertBeforeDelete = () => {
        Alert.alert(
            'Notice',
            'Delete this Item?',
            [
                {
                    text: 'Cancel',
                    //onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: onDeleteProductItem },
            ],
            { cancelable: false },
        );
    }
    return (
        <Swipeable
            renderLeftActions={(progress, dragX) => (
                <LeftActions progress={progress} dragX={dragX} onPressDelete={alertBeforeDelete} />
            )}
        //onSwipeableLeftOpen={onSwipeFromLeft}

        >
            <View style={styles.cartItem}>
                <View style={styles.itemData}>
                    <Text style={styles.quantity}>{props.quantity}</Text>
                    <Text style={styles.mainText}>{props.title}</Text>
                </View>
                <View style={styles.itemData}>
                    <Text style={styles.amount}>${Math.round(props.amount.toFixed(2) * 100) / 100}</Text>
                    {props.deletable && (
                        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                            <Icon
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color='red'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },

    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quantity: {

        color: '#888',
        fontSize: 20
    },

    mainText: {

        fontSize: 18,
        marginLeft: 20
    },

    deleteButton: {
        marginLeft: 20
    },

    amount: {
        fontSize: 18
    },

    trashSlide: {
        //backgroundColor: '#388e3c',
        backgroundColor: 'red',
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 10,
        fontSize: 16
    },
})

export default CartItem;