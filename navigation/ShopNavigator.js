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
const OrderNavigator = createStackNavigator(
    {
        OrdersScreens: OrdersScreens
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }

);
const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavtigator,
        Orders: OrderNavigator
    },
    {
        drawerWidth: Math.min(height, width) * 0.6,
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
)

export default createAppContainer(ShopNavigator)