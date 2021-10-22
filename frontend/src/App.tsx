
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetUsers } from './slices/authSlice';
import { cyan } from '@material-ui/core/colors';
import Modal from './components/organisms/Modal'

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
    const modalOpen = useAppSelector(state => state.component.modalOpen)

    useEffect(() => {
        dispatch(fetchAsyncGetUsers())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Router />
            <Modal open={modalOpen} /> 
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
