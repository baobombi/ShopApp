import React from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text

} from 'react-native'

import { userSelector } from 'react-redux'

const OrdersScreens = (props) => {

    const orders = userSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}

        />
    );

};
OrdersScreens.navigationOptions = () => {
    return {
        headerTitle: 'Your Orders'
    }
}
const styles = StyleSheet.create({

});
export default OrdersScreens;
