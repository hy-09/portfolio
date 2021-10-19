
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00899b',
        },
        background: {
            default: '#f4f5fd'
        }
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
