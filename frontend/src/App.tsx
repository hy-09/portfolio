
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetMyProf, fetchAsyncGetUsers } from './slices/authSlice';
import { cyan } from '@material-ui/core/colors';
import Modal from './components/organisms/Modal'
import Snackbar from './components/atoms/Snackbar';

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            contrastText: '#efefef',
        },
        background: {
            default: '#f7fdff'
        },
    }
})

function App() {
    const dispatch = useAppDispatch()
    const modal = useAppSelector(state => state.component.modal)
    const notify = useAppSelector(state => state.component.notify)

    useEffect(() => {
        dispatch(fetchAsyncGetUsers())
        if(!!localStorage.localJWT) {
            dispatch(fetchAsyncGetMyProf())
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Router />
            <Modal modal={modal} />
            <Snackbar notify={notify} />
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
