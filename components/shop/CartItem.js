import React from 'react'
import {

    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Icon
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
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
    }
})

export default CartItem;