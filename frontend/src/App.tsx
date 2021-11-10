
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, CssBaseline } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchAsyncGetUsers } from './slices/authSlice';
import { cyan, green, grey, pink } from '@material-ui/core/colors';
import Modal from './components/organisms/Modal'
import Snackbar from './components/atoms/Snackbar';
import LoadingCircular from './components/organisms/LoadingCircular';
import { endLoading, startLoading } from './slices/othersSlice';
import { fetchAsyncGetCompanies, updateStockPrices } from './slices/stockSlice';
import { fetchAsyncGetDataFuncs } from './functions/fetchAsyncGetDataFuncs'
import Backdrop from './components/atoms/Backdrop';

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            light: cyan[50],
            contrastText: '#efefef',
        },
        secondary: {
            main: pink[500],
        },
        success: {
            main: green[500],
        },
        background: {
            default: 'rgba(0, 151, 167, 0.03)'
        },
        text: {
            secondary: grey[600],
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
})

function App() {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.others.isLoading)
    const modal = useAppSelector(state => state.others.modal)
    const notify = useAppSelector(state => state.others.notify)
    const backdrop = useAppSelector(state => state.others.backdrop)

    useEffect(() => {
        const fetchBootLoader = async () => {
            if (!localStorage.stockPriceUpdateFrequency) {
                localStorage.setItem('stockPriceUpdateFrequency', '1500')
            }

            await dispatch(startLoading())
            await dispatch(fetchAsyncGetUsers())
            await dispatch(fetchAsyncGetCompanies())
            setInterval(() => {
                dispatch(updateStockPrices())
            }, Number(localStorage.stockPriceUpdateFrequency))
    
            if(!!localStorage.localJWT) {
                for (const func of fetchAsyncGetDataFuncs) {
                    await dispatch((func as Function)())
                }
            }
            dispatch(endLoading())
        }

        fetchBootLoader()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            {isLoading && (
                <LoadingCircular />
            )}
            <Router />
            <Modal modal={modal} />
            <Snackbar notify={notify} />
            <Backdrop backdrop={backdrop} />
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
