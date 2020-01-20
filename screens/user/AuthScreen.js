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
    Alert,
    ActivityIndicator
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

const AuthScreen = (props) => {

    const dispath = useDispatch()

    const [error, setError] = useState('')

    const [isLoginError, setIsLoginError] = useState('')
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [isSignUpLoading, setIsSignUpLoading] = useState(false)

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

    const SignUpHandler = useCallback(async () => {
        setIsLoginError(null)
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong Input!!!',
                'Please check errors in the form ',
                [
                    { text: 'OK' }
                ])
            return;
        }
        setError(null)
        setIsSignUpLoading(true)
        try {

            await dispath(authActions.SignUp(formState.inputValues.email, formState.inputValues.password))
        } catch (err) {
            setError(err.message)

        }
        setIsSignUpLoading(false)
    }, [dispath, formState])

    const LoginHandler = useCallback(async () => {
        setError(null)

        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong Input!!!',
                'Please check errors in the form ',
                [
                    { text: 'OK' }
                ])
            return;
        }
        
        setIsLoginError(null)
        setIsLoginLoading(true)
        try {
            // console.log('da di vao trong Login Handler try')
            // console.log(formState.inputValues.email)
            // console.log(formState.inputValues.password)
            await dispath(authActions.login(formState.inputValues.email, formState.inputValues.password))
            props.navigation.navigate('Shop')
        } catch (err) {
            setIsLoginError(err.message)
            //console.log(err.message)

        }
        setIsLoginLoading(false)
    }, [dispath, formState])

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error,
                [{ text: 'OK' }])
        }else if(isLoginError){
            Alert.alert('An Error Occurred', isLoginError,
                [{ text: 'OK' }])
        }
    }, [error,isLoginError])

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
                            id="password"
                            placeholder='Enter your Password'
                            keyboardType='default'
                            style={styles.textInput}
                            errorText='Please enter a valid Password'
                            secureTextEntry={true}
                            minLength={5}
                            autoCapitalize="none"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            required
                            Login
                        />
                    </View>

                    {
                        isLoginLoading ?
                            (
                                <View style={styles.loginLoading}>
                                    <ActivityIndicator size='large' color={Colors.primary} />
                                </View>
                            )
                            : <TouchableOpacity style={styles.loginButton} onPress={LoginHandler}>
                                <Text style={styles.loginButtonTitle}>Login</Text>
                            </TouchableOpacity>
                    }

                    <Divider style={styles.divider} />
                    <FontAwesome.Button
                        style={styles.facebookButton}
                        name='facebook'
                    >
                        <Text style={styles.loginSocialButton}>Login with Facebook</Text>
                    </FontAwesome.Button>

                    {
                        isSignUpLoading ?
                            (
                                <View style={styles.signUpLoading} >
                                    <ActivityIndicator size='large' color={Colors.primary} />
                                </View>
                            )
                            : <TouchableOpacity style={styles.signUpButton} onPress={SignUpHandler} disabled={isLoginLoading}>
                                <Text style={styles.loginButtonTitle}>Sign Up</Text>
                            </TouchableOpacity>
                    }

                </View>
            </View>
        </TouchableWithoutFeedback >
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
        backgroundColor: '#0099CC',

    },

    signUpButton: {
        height: 45,
        width: 300,
        backgroundColor: '#0099CC',
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
    },

    signUpLoading: {
        marginTop: 20,
    }
})

export default AuthScreen