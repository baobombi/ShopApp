import React from 'react'
import {
    Platform,
    Dimensions
} from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreens from '../screens/shop/OrdersScreen';
import IconFilter from 'react-native-vector-icons/AntDesign'
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import FilterProductScreen from '../screens/shop/FilterProductScreen';
import FavoritesScreen from '../screens/shop/FavoritesScreen';

import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import AuthScreen from '../screens/user/AuthScreen';

IconFilter.loadFont()



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
    defaultNavigationOptions: defaultNavOptions
})

const FavNavigator = createStackNavigator(
    {
        Favorites:
        {
            screen: FavoritesScreen
        },
        ProductDetail: { screen: ProductDetailScreen },

        //MealsNavigator: MealsNavigator

    },
    {

        initialRouteName: 'Favorites',
        defaultNavigationOptions: defaultNavOptions
    }
);

const tabScreenConfig = {

    Products: {
        screen: ProductsNavtigator,
        navigationOptions: {

            // drawerIcon: drawerConfig => <Icon
            //     name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            //     size={23}
            //     color={drawerConfig.tintColor}
            // />,
            tabBarIcon: tabInfo => {
                return (
                    <Icon name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.primary,
            //tabBarLabel: ''
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Icon name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accent
        }
    }
};

const ProductFavTabNavigator =
    Platform.OS === 'android'
        ? createBottomTabNavigator(tabScreenConfig, {
            activeTintColor: 'white',
            shifting: true,
            barStyle: {
                // backgroundColor: Colors.accentColor
                backgroundColor: 'yellow'
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {
            barStyle: {
                // backgroundColor: Colors.accentColor
                backgroundColor: 'yellow'
            },
            tabBarOptions: {
                labelStyle: {},
                activeTintColor: Colors.primary
            }
        });

const FilterNavigator = createStackNavigator(
    {
        Filters: FilterProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <IconFilter
                name={Platform.OS === 'android' ? 'filter' : 'filter'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions

    }

)

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
        Products: {
            screen: ProductFavTabNavigator,
            navigationOptions: {

                drawerIcon: drawerConfig => <Icon
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />,
            }
        },
        Orders: OrderNavigator,
        Admin: AdminNavigator,

    },
    {
        drawerWidth: Math.min(height, width) * 0.6,
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
)

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        headerMode: 'none',
        defaultNavigationOptions: {
           
        }
    }
)
const MainNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Shop: ShopNavigator
    },
    {
        initialRouteName: 'Auth',

    }
)


export default createAppContainer(MainNavigator)