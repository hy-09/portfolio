import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { Formik } from 'formik'
import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from "yup"
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

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    circularProgressWrapper: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9999999,
    },
    circularProgress: {
        position: 'absolute',
        top: 'calc(50% - 25px)',
        left: 'calc(50% - 25px)',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(1)
    }
}))

const Login: FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useAppDispatch()
    const isLoadingAuth = useAppSelector(state => state.auth.isLoadingAuth)
    const users = useAppSelector(state => state.auth.users)
    const [isLoginForm, setIsLoginForm] = useState(true)

    return (
        <>
        {isLoadingAuth && (
            <div className={classes.circularProgressWrapper}>
                <CircularProgress className={classes.circularProgress}/>
            </div>
        )}

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h6" component="h1">
                    {isLoginForm ? 'ログイン' : 'アカウント作成'}
                </Typography>
                {isLoginForm ? (
                    <Formik
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
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('メールアドレスの形式で入力してください')
                                .required('メールアドレスは必須です'),
                            password: Yup.string().required('パスワードは必須です').min(4)
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
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="メールアドレス"
                                    type="input"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (
                                    <div className={classes.error}>{errors.email}</div>
                                ) : null}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワード"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? (
                                    <div className={classes.error}>{errors.password}</div>
                                ) : null}
                                <Button
                                    className={classes.submit}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    ログイン
                                </Button>
                                <Link
                                    href="#"
                                    onClick={async () => {
                                        setIsLoginForm(false)
                                        errors.email = ''
                                        errors.password = ''
                                    }}
                                >
                                    アカウント作成はこちら
                                </Link>
                            </form>
                        }
                    </Formik>
                ) : (
                    <Formik
                        initialValues={{email: '', password: '', passwordConfirm: ''}}
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
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('メールアドレスの形式で入力してください')
                                .required('メールアドレスは必須です')
                                .test('email-test',
                                    'このメールアドレスは既に登録済みです',
                                    (value) => {
                                        if (users.find(user => user.email === value)) {
                                            return false
                                        } else {
                                            return true
                                        }
                                    }
                                ),
                            password: Yup.string().required('パスワードは必須です'),
                            passwordConfirm: Yup
                            .string()
                            .oneOf([Yup.ref('password')], 'パスワードが一致しません')
                            .required('パスワードの再入力は必須です'),
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
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="メールアドレス"
                                    type="input"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (
                                    <div className={classes.error}>{errors.email}</div>
                                ) : null}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワード"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? (
                                    <div className={classes.error}>{errors.password}</div>
                                ) : null}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワードの再入力"
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.passwordConfirm}
                                />
                                {touched.passwordConfirm && errors.passwordConfirm ? (
                                    <div className={classes.error}>{errors.passwordConfirm}</div>
                                ) : null}
                                <Button
                                    className={classes.submit}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    作成する
                                </Button>
                                <Link
                                    href="#"
                                    onClick={async () => {
                                        setIsLoginForm(true)
                                        errors.email = ''
                                        errors.password = ''
                                        errors.passwordConfirm = ''
                                    }}
                                >
                                    すでにアカウントをお持ちの方
                                </Link>
                            </form>
                            }
                    </Formik>
                )}
            </div>
        </Container>
        </>
    )
}

export default Login
