import React from 'react'
import {
    FlatList,
    StyleSheet,
    Button
} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import IconHeader from '../../components/UI/IconHeader';
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = (props) => {

    const userProducts = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item)}}
                    //onAddToCart={() => { }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => {
                        editProductHandler(itemData.item)
                    }} />

                    <Button 
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => {
                            dispatch(productActions.deleteProduct(itemData.item.id))
                        }}
                    />
                </ProductItem>
            }
        />
    );
}
UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <IconHeader
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onTapped={() => {
                navData.navigation.toggleDrawer();
            }}
        />,
        headerRight: <IconHeader
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onTapped={() => {
                navData.navigation.navigate('EditProduct')
            }}
        />,
    }
}

export default UserProductsScreen