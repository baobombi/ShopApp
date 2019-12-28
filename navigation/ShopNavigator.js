import React from 'react'
import {
    Platform,
    Dimensions
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreens from '../screens/shop/OrdersScreen';
import Icon from 'react-native-vector-icons/Ionicons'
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';


const { width, height } = Dimensions.get('screen');

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}
const ProductsNavtigator = createStackNavigator({
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    mode: 'modal',
    initialRouteName: 'ProductsOverview',
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})
const OrderNavigator = createStackNavigator(
    {
        OrdersScreens: OrdersScreens
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Icon
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }

);
const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Icon
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavtigator,
        Orders: OrderNavigator,
        Admin: AdminNavigator
    },
    {
        drawerWidth: Math.min(height, width) * 0.6,
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
)

export default createAppContainer(ShopNavigator)