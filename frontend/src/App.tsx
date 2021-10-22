
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetUsers } from './features/auth/authSlice';
import { cyan } from '@material-ui/core/colors';

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
    useEffect(() => {
        dispatch(fetchAsyncGetUsers())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Router />
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
