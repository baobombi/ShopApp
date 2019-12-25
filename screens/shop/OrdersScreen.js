import React from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Platform

} from 'react-native'

import { useSelector } from 'react-redux'
import IconHeader from '../../components/UI/IconHeader';

const OrdersScreens = (props) => {

    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}

        />
    );

};
OrdersScreens.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,
    }
}
const styles = StyleSheet.create({

});
export default OrdersScreens;
