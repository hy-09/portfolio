
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetUsers } from './slices/authSlice';
import { cyan } from '@material-ui/core/colors';
import Modal from './components/organisms/Modal'
import Snackbar from './components/atoms/Snackbar';
import LoadingCircular from './components/organisms/LoadingCircular';
import { endLoading, startLoading } from './slices/othersSlice';
import { fetchAsyncGetCompanies, updateStockPrices } from './slices/stockSlice';
import { fetchAsyncGetDataFuncs } from './functions/fetchAsyncGetDataFuncs'

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            contrastText: '#efefef',
        },
        background: {
            default: '#f4f9f9'
        },
    },
})

function App() {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.others.isLoading)
    const modal = useAppSelector(state => state.others.modal)
    const notify = useAppSelector(state => state.others.notify)

    useEffect(() => {
        const f = async () => {
            await dispatch(startLoading())
            await dispatch(fetchAsyncGetUsers())
            await dispatch(fetchAsyncGetCompanies())
            setInterval(() => {
                dispatch(updateStockPrices())
            }, 1500)

            if(!!localStorage.localJWT) {
                for (const func of fetchAsyncGetDataFuncs) {
                    await dispatch((func as Function)())
                }
            }
            await dispatch(endLoading())
        }
        f()
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            {isLoading && (
                <LoadingCircular />
            )}
            <Router />
            <Modal modal={modal} />
            <Snackbar notify={notify} />
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
