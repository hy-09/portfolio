
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetUsers } from './features/auth/authSlice';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00899b',
        },
        background: {
            // default: '#f4f5fd'
            default: '#f4f8f8'
        }
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
