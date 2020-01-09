import React, { useState, useEffect, useCallback} from 'react'
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

const FilterProductScreen = () => {
    //const [isPrice]

    return (
        <View>
            <Text>abc</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})
FilterProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter',
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,
        headerRight: <IconHeader
        name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onTapped={() => {
                //navData.navigation.navigate({ routeName: 'Cart' });
            }}
        />,
    }
}
export default FilterProductScreen