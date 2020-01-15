import React from 'react'
import {
  SafeAreaView,
  StyleSheet
} from 'react-native'

import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk' 
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'
import ShopNavigator from './navigation/ShopNavigator'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

const App = () => {

  return (

    <Provider store={store}>
      <ShopNavigator />
    </Provider>

  )
}

export default App;