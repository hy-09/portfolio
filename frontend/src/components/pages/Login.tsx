import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { object, string } from "yup"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { 
    fetchAsyncCreateProf,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchCredEnd,
    fetchCredStart,
    resetOpenSignIn,
    resetOpenSignUp,
    selectIsLoadingAuth, 
    selectOpenSignIn, 
    selectOpenSignUp,
    setOpenSignIn,
    setOpenSignUp
} from '../../features/auth/authSlice'

const Login = () => {
    const history = useHistory()
    const isLoadingAuth = useAppSelector(state => state.auth.isLoadingAuth)
    const dispatch = useAppDispatch()
    const [isLoginForm, setIsLoginForm] = useState(true)

    return (
        <Grid
            container
        >
            <h1>Instagram Clone</h1>
            {isLoginForm ? (
                <Formik
                    initialErrors={{email: 'required'}}
                    initialValues={{email: '', password: ''}}
                    onSubmit={async (values) => {
                        await dispatch(fetchCredStart())
                        const result = await dispatch(fetchAsyncLogin(values))

                        if (fetchAsyncLogin.fulfilled.match(result)) {
                            await dispatch(fetchAsyncGetProfs())
                            // await dispatch(fetchAsyncGetPosts())
                            await dispatch(fetchAsyncGetMyProf())
                        }
                        await dispatch(fetchCredEnd())
                        await dispatch(resetOpenSignIn())
                        history.push('/home')
                    }}
                    validationSchema={object().shape({
                        email: string()
                            .email('email format is wrong')
                            .required('email is required'),
                        password: string().required('password is required').min(4)
                    })}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => 
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <br />
                                    <div>
                                        {isLoadingAuth && <CircularProgress/>}
                                    </div>
                                    <br />
                                    <TextField
                                        placeholder="email"
                                        type="input"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <br />
                                    {touched.email && errors.email ? (
                                        <div>{errors.email}</div>
                                    ) : null}

                                    <TextField
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <br />
                                    {touched.password && errors.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}
                                    <br />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!isValid}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <br />
                                    <br />
                                    <span
                                        onClick={async () => setIsLoginForm(false)}
                                    >
                                        You don't have an account ?
                                    </span>
                                </div>
                            </form>
                        </div>}
                </Formik>
            ) : (
                <Formik
                    initialErrors={{email: 'required'}}
                    initialValues={{email: '', password: ''}}
                    onSubmit={async (values) => {
                        await dispatch(fetchCredStart())
                        const resultReg = await dispatch(fetchAsyncRegister(values))

                        if (fetchAsyncRegister.fulfilled.match(resultReg)) {
                            await dispatch(fetchAsyncLogin(values))
                            await dispatch(fetchAsyncCreateProf({name: 'anonymous'}))

                            await dispatch(fetchAsyncGetProfs())
                            // await dispatch(fetchAsyncGetPosts())
                            await dispatch(fetchAsyncGetMyProf())
                        }
                        await dispatch(fetchCredEnd())
                        await dispatch(resetOpenSignUp())
                        history.push('/home')
                    }}
                    validationSchema={object().shape({
                        email: string()
                            .email('email format is wrong')
                            .required('email is required'),
                        password: string().required('password is required').min(4)
                    })}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => 
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <br />
                                    <div>
                                        {isLoadingAuth && <CircularProgress/>}
                                    </div>
                                    <br />
                                    <TextField
                                        placeholder="email"
                                        type="input"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <br />
                                    {touched.email && errors.email ? (
                                        <div>{errors.email}</div>
                                    ) : null}

                                    <TextField
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <br />
                                    {touched.password && errors.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}
                                    <br />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!isValid}
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                    <br />
                                    <br />
                                    <span
                                        onClick={async () => setIsLoginForm(true)}
                                    >
                                        You already have an account ?
                                    </span>
                                </div>
                            </form>
                        </div>}
                </Formik>
            )}
        </Grid>
    )
}

export default Login
