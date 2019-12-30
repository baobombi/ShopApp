import React from 'react'
import {
    FlatList,
    StyleSheet,
    Button,
    Alert
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
    const deleteHandler = (id) => {
        Alert.alert('Are you sure? ', 'Do you really want to delete this item?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => { dispatch(productActions.deleteProduct(id)) } }
            ],
            { cancelable: false },
        );
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
                    onSelect={() => { editProductHandler(itemData.item) }}
                //onAddToCart={() => { }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => {
                        editProductHandler(itemData.item.id)
                    }} />

                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this,itemData.item.id)}
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