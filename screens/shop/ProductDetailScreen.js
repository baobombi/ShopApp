import React, { useCallback, useEffect } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView,
    Alert
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import IconHeader from '../../components/UI/IconHeader';
import { addFavoriteProduct } from '../../store/actions/products';

const ProductDetailScreen = (props) => {

    const productId = props.navigation.getParam('productId')

    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );

    const currentFavoriteProduct = useSelector(state => state.products.favoriteProduct.some(prod => prod.id === productId));

    const dispatch = useDispatch();

    const toggleFavoriteProduct = useCallback(() => {
        dispatch(addFavoriteProduct(productId))
    }, [dispatch, productId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteProduct })
    }, [toggleFavoriteProduct]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentFavoriteProduct })
    }, [currentFavoriteProduct])


    return (

        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>

            <View style={styles.actions}>
                <Button color={Colors.primary} title='Add To Cart' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                }} />
            </View>
        </ScrollView>
    );

}
ProductDetailScreen.navigationOptions = navData => {

    const toggleFavorite = navData.navigation.getParam('toggleFav')

    const isFavorite = navData.navigation.getParam('isFav')

    const FavShowAlert = () => {
        if (!isFavorite) {
            Alert.alert(
                'Add Favorite', 'Do you want?',
                [
                    { text: 'OK', onPress: toggleFavorite },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }

                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(

                'Delete Favorite', 'Do you want? ',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: toggleFavorite, }
                ],
                { cancelable: false }
            )
        }
    }

    return {

        headerTitle: navData.navigation.getParam('productTitle'),
        headerRight: (
            <View style={styles.viewItemIcons}>
                <IconHeader onTapped={FavShowAlert} name={isFavorite ? 'ios-star' : 'ios-star-outline'} />
            </View>),
       

    }

}
const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 300
    },

    price: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },

    description: {
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
    },

    actions: {
        margin: 10,
        textAlign: 'center'
    },

});

export default ProductDetailScreen