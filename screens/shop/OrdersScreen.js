import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Platform,
    ActivityIndicator,
    Button

} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import IconHeader from '../../components/UI/IconHeader';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors'
import * as odersAction from '../../store/actions/orders'

const OrdersScreens = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(odersAction.fetchOrders())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadOrders()
    }, [loadOrders])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus', loadOrders)
        return () => {
            willFocusSub.remove()
        }
    })
    if (isLoading) {
        return (
            <View style={styles.styleOrdersLoading}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>An Error Occured!!</Text>
                <Button title='Try Again' onPress={loadOrders} color={Colors.primary} />
            </View>
        )
    }

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

    styleOrdersLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },

    orderEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },

    textEmpty: {
        fontSize: 20,
        color: Colors.primary
    },

    centered: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },

    errorText:{
        fontSize: 16
    }

});
export default OrdersScreens;
