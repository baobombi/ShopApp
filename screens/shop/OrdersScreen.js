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
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors'


const OrdersScreens = (props) => {

    const orders = useSelector(state => state.orders.orders)

    if (orders.length === 0) {
        return (<View style={styles.orderEmpty}>
            <Text style={styles.textEmpty}>Your oders is Empty!!!</Text>
        </View>)
    }
    else {
        return (<FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
            }
        />)
    }
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
    orderEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },

    textEmpty: {
        fontSize: 20,
        color: Colors.primary
    }
});
export default OrdersScreens;
