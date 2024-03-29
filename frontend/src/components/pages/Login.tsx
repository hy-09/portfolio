import { Avatar, Button, Container, Divider, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { Formik } from 'formik'
import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchAsyncGetDataFuncs } from '../../functions/fetchAsyncGetDataFuncs'
import { homeURL } from '../../router/AuthRoutes'
import { 
    fetchAsyncCreateProf,
    fetchAsyncLogin,
    fetchAsyncRegister,
} from '../../slices/authSlice'
import { setFirstTimeAfterRegister } from '../../slices/authSlice'
import { endLoading, startLoading } from '../../slices/othersSlice'
import ErrorMessage from '../atoms/ErrorMessage'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4, 2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6)
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: '#f44336',
        marginLeft: '14px',
        marginRight: '14px',
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
    }
}))

const Login: FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.auth.users)
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [failed, setFailed] = useState(false) 
    const [showDammyUserButton, setShowDammyUserButton] = useState(false)

    return (
        <Container component="main" maxWidth="sm">

            <Paper className={classes.paper}>
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
                            await dispatch(startLoading())
                            const result = await dispatch(fetchAsyncLogin(values))

                            if (fetchAsyncLogin.fulfilled.match(result)) {
                                for (const func of fetchAsyncGetDataFuncs) {
                                    await dispatch((func as Function)())
                                }

                                history.push(homeURL)

                            } else if (fetchAsyncLogin.rejected.match(result)) {
                                setFailed(true)
                            }
                            dispatch(endLoading())
                            
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('メールアドレスの形式で入力してください')
                                .required('メールアドレスは必須です'),
                            password: Yup.string().required('パスワードは必須です')
                        })}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            touched,
                            values,
                            errors,
                            isValid,
                        }) => 
                            <form id="loginForm" onSubmit={handleSubmit} className={classes.form}>
                                {/* <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="メールアドレス"
                                    type="input"
                                    name="email"
                                    onChange={e => {
                                        if (failed) setFailed(false)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    helperText={errors.email && touched.email && errors.email}
                                    error={errors.email && touched.email ? true : false}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワード"
                                    type="password"
                                    name="password"
                                    onChange={e => {
                                        if (failed) setFailed(false)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    helperText={errors.password && touched.password && errors.password}
                                    error={errors.password && touched.password ? true : false}
                                />
                                <ErrorMessage show={failed} message="メールアドレスかパスワードが間違っています" />
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
                                        setFailed(false)
                                        setShowDammyUserButton(false)
                                        values.email = ''
                                        values.password = ''
                                        errors.email = ''
                                        errors.password = ''
                                    }}
                                >
                                    アカウント作成はこちら
                                </Link>
                                <Divider style={{margin: '40px 0'}} /> */}
                                <p style={{marginBottom: 16}}>
                                    なぜか本番環境では、ログイン・新規登録のバリデーションがうまく機能しないためフォームを非表示にしています。
                                </p>
                                <p>
                                    <Link 
                                        href="#" 
                                        color="secondary"
                                        onClick={() => setShowDammyUserButton(!showDammyUserButton)}    
                                    >
                                        ダミーユーザーでログイン
                                    </Link>
                                </p>
                                {showDammyUserButton && (
                                    <Grid 
                                        container 
                                        spacing={2}
                                        style={{marginTop: '10px'}}
                                    >
                                        {users.slice(0, 50).map((user, i) => (
                                            <Grid item xs={3} key={user.id}>
                                                <Button 
                                                    color="secondary"
                                                    variant="outlined"
                                                    fullWidth
                                                    onClick={() => {
                                                        values.email = user.email
                                                        values.password = 'dammy'
                                                        handleSubmit()
                                                    }}
                                                >
                                                    {i+1}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </form>
                        }
                    </Formik>

                ) : (

                    <Formik
                        initialValues={{email: '', password: '', passwordConfirm: ''}}
                        onSubmit={async (values) => {
                            await dispatch(startLoading())
                            const result = await dispatch(fetchAsyncRegister(values))

                            if (fetchAsyncRegister.fulfilled.match(result)) {
                                await dispatch(fetchAsyncLogin(values))
                                await dispatch(fetchAsyncCreateProf({name: 'anonymous'}))

                                for (const func of fetchAsyncGetDataFuncs) {
                                    await dispatch((func as Function)())
                                }
                                
                                await dispatch(setFirstTimeAfterRegister(true))
                                history.push(homeURL)

                            } else if (fetchAsyncRegister.rejected.match(result)) {
                                setFailed(true)
                            }
                            dispatch(endLoading())
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('メールアドレスの形式で入力してください')
                                .required('メールアドレスは必須です')
                                .test('email-used',
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
                                .required('パスワードの再入力は必須です')
                        })}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            touched,
                            values,
                            errors,
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
                                    onChange={e => {
                                        if (failed) setFailed(false)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    helperText={errors.email && touched.email && errors.email}
                                    error={errors.email && touched.email ? true : false}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワード"
                                    type="password"
                                    name="password"
                                    onChange={e => {
                                        if (failed) setFailed(false)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    helperText={errors.password && touched.password && errors.password}
                                    error={errors.password && touched.password ? true : false}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="パスワードの再入力"
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={e => {
                                        if (failed) setFailed(false)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.passwordConfirm}
                                    helperText={errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}
                                    error={errors.passwordConfirm && touched.passwordConfirm ? true : false}
                                />
                                <ErrorMessage show={failed} message="メールアドレスの形式で入力してください" />
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
                                        setFailed(false)
                                        values.email = ''
                                        values.password = ''
                                        values.passwordConfirm = ''
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
            </Paper>

        </Container>
    )
}

export default Login
