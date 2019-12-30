import React, { useState, useCallback, useEffect } from 'react'
import {

    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput

} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import IconHeader from '../../components/UI/IconHeader';
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {

    const dispatch = useDispatch()
    const prodId = props.navigation.getParam('productId')
    //console.log(prodId.id)

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    )
    //console.log(editedProduct)
    //MARK: Properties
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId, title, description, imageUrl))
        } else {
            dispatch(productActions.createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack()
    }, [dispatch, title, description, imageUrl, price, prodId]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>

    );

}

const styles = StyleSheet.create({

    form: {

        margin: 20,

    },

    formControl: {

        width: '100%'
    },

    label: {

        marginVertical: 8,

    },

    input: {

        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }

})
EditProductScreen.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: <IconHeader
            name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onTapped={submitFn}
        />,
    }
}


export default EditProductScreen