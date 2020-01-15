import React, { useState, useCallback, useEffect, useReducer } from 'react'
import {
    ScrollView,
    KeyboardAvoidingView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import Input from '../../components/UI/Input';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'
import { useDispatch } from 'react-redux';
FontAwesome.loadFont()
Ionicons.loadFont()

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

const AuthScreen = () => {

    const dispath = useDispatch()
   
    const [formState, dispatchFormState] = useReducer(formReducer, {

        inputValues: {
            email: '',
            password: ''
        },

        inputValidities: {
            email: false,
            password: false
        },

        formIsValid: false
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({ type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier })
    }, [dispatchFormState]);

    const SignUpHandler = useCallback(() => {

        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong Input!!!',
                'Please check errors in the form ',
                [
                    { text: 'OK' }
                ])
            return;
        }
        dispath(authActions.SignUp(formState.inputValues.email, formState.inputValues.password))
    },[dispath,formState])

    const Divider = props => {

        return (<View {...props} >
            <View style={styles.line}></View>
            <Text style={styles.textOR}>OR</Text>
            <View style={styles.line}></View>
        </View>)
    }
    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>

                <View style={styles.up}>
                    <Ionicons name="ios-speedometer" color={Colors.primary} size={100} />
                    <Text style={styles.title}>Enjoy Shopping with Us</Text>
                </View>


                <View style={styles.down}>

                    <View style={styles.textInputContainer}>
                        {/* <TextInput
                            style={styles.textInput}
                            id='email'
                            placeholder='Enter your Email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                        /> */}
                        <Input
                            Login
                            id='email'
                            style={styles.textInput}
                            placeholder='Enter your Email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            required
                            email
                            errorText='Please enter a valid email adress'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <Input
                            Login
                            style={styles.textInput}
                            placeholder='Enter your Password'
                            keyboardType='default'
                            secureTextEntry={true}
                            minLength={5}
                            errorText='Please enter a valid Password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            required
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={SignUpHandler}>

                        <Text style={styles.loginButtonTitle}>Login</Text>
                    </TouchableOpacity>
                    <Divider style={styles.divider} />
                    <FontAwesome.Button
                        style={styles.facebookButton}
                        name='facebook'
                    >
                        <Text style={styles.loginSocialButton}>Login with Facebook</Text>
                    </FontAwesome.Button>

                    <TouchableOpacity style={styles.signUpButton}>

                        <Text style={styles.loginButtonTitle}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </TouchableWithoutFeedback>


    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        //backgroundColor: COLOR_PINK_LIGHT
        //backgroundColor: 'black'

    },

    linearGradient: {
        flex: 1,
    },

    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'black'

    },

    title: {
        textAlign: 'center',
        color: Colors.primary,
        //color: 'white',
        width: 400,
        fontSize: 23
    },

    down: {
        flex: 7,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
        //backgroundColor: 'green'
    },

    textInputContainer: {
        //marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'black',
        // flexDirection:'row'
    },

    textInput: {

        height: 45,
        width: 280,
    },

    loginButton: {
        marginTop: 10,
        height: 45,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: 'green',

    },

    signUpButton: {
        height: 45,
        width: 300,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 6,
    },

    loginSocialButton: {
        color: 'white',
        fontSize: 18
    },

    loginButtonTitle: {
        //color: '',
        fontSize: 18,
        color: 'white'
    },

    facebookButton: {

        height: 45,
        width: 300,
        justifyContent: 'center',
        //alignItems: 'center',
    },

    line: {
        height: 1,
        flex: 2,
        backgroundColor: 'black'
    },

    textOR: {
        flex: 1,
        textAlign: 'center'
    },

    divider: {
        flexDirection: 'row',
        width: 298,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AuthScreen