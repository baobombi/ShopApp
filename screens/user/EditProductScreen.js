import React, { useState, useCallback, useEffect, useReducer } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import IconHeader from '../../components/UI/IconHeader';
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updateFormIsValid = true
        for (const key in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[key]
        }
        return {

            formIsValid: updateFormIsValid,
            inputValidities: updateValidities,
            inputValues: updateValues
        }
    }
    return state
}

const EditProductScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();

    const dispatch = useDispatch()
    const prodId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    )

    //   console.log('LOAD PRODUCT ')
     ///console.log(editedProduct)

    const [formState, dispatchFormState] = useReducer(formReducer, {

        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : ''
        },

        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },

        formIsValid: editedProduct ? true : false,
    })

    //MARK: Properties
    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    // const [titleIsValid, setTitleIsValid] = useState(false)

    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')

    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    useEffect(() => {
        if (error) {
            Alert.alert('An error Occurred', error, [{ text: 'OK'  }])
        }
    })

    const submitHandler = useCallback(async () => {

        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong Input!!!',
                'Please check errors in the form ',
                [
                    { text: 'OK' }
                ])
            return;
        }
        setIsLoading(true)
        setError(null)
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    prodId, formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ))
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price))
            }
            props.navigation.goBack()
        } catch (error) {
            setError(error.message)
        }

        setIsLoading(false)
        setError(null)
        
    }, [dispatch, formState, prodId]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({ type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier })
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.entered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({

    form: {

        margin: 20,

    },

    entered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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