export const SIGNUP = 'SIGNUP'
export const SignUp = (email, password) => {
    return async dispatch => {

        try {

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAXH5b7NyzUiIN6fYJeyBlF50cuiP7BhVw',
                {
                    method: POST,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                })

            if (!response.ok) {
                throw new Error('Some thing went wrong!!!!!')
            }


        } catch (err) {
            throw err
        }
        const resData = await response.json()
        console.log(resData)
        dispatch({
            type: SIGN_UP,


        })
    }
}