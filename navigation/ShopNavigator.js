import {
    Platform
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';


const ProductsNavtigator = createStackNavigator({
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen

}, {
    mode: 'modal',
    initialRouteName: 'ProductsOverview',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(ProductsNavtigator)