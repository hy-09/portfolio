import { Box, Button, ButtonGroup, Container, createTheme, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableRow, TextField, ThemeProvider, Typography, useTheme } from "@material-ui/core"
import { FC, useCallback, useState } from "react"
import { useHistory, useParams, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getRoute } from "../../../../functions/router"
import { fetchAsyncPatchUser } from "../../../../slices/authSlice"
import { endLoading, startLoading } from "../../../../slices/othersSlice"
import { fetchAsyncCreateBoughtStockInfo } from "../../../../slices/stockSlice"
import Title from "../../../atoms/Title"
import Main from "../../../organisms/layout/Main"
import SectionPaper from "../../../organisms/SectionPaper"
import Step1 from "../../../organisms/stockForm/Step1"
import Step2 from "../../../organisms/stockForm/Step2"

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3'
        },
    },
})

type Params = {
    id: string;
}

type Location = {
    nowPrice: number;
    format: 'buy' | 'sell';
    totalQuantity: number;
}

const StockTradeForm: FC = () => {
    const history = useHistory()
    const { id } = useParams<Params>()
    const { state: { nowPrice, format, totalQuantity }  } = useLocation<Location>()
    const companies = useAppSelector(state => state.stock.companies)
    const company = companies.find(company => company.id === Number(id))!
    const loginUser = useAppSelector(state => state.auth.loginUser)
    const fund = loginUser.fund
    const [quantity, setQuantity] = useState(100)
    const [changeRate, setChangeRate] = useState(100)
    const [totalPrice, setTotalPrice] = useState(nowPrice * quantity)
    const [newFund, setNewFund] = useState(format === 'buy' ? fund - totalPrice : fund + totalPrice)
    const [newHoldingQuantity, setNewHoldingQuantity] = useState(format === 'buy' ? totalQuantity + quantity : totalQuantity - quantity)
    const [step, setStep] = useState(1)
    
    if (company == undefined || company.id == 0) {
        history.push(getRoute('stocks'))
        window.location.reload()
    }

    return (
        <Main title={format === 'buy' ? '購入フォーム' : '売却フォーム'}>
            <Grid item xs={12}>
                <Container maxWidth="sm" style={{padding: 0}}>
                    <SectionPaper responsivePadding={true}>
                        <ThemeProvider theme={theme}>
                            {step === 1 && (
                                <Step1 
                                    company={company}
                                    nowPrice={nowPrice}
                                    quantity={quantity}
                                    changeRate={changeRate}
                                    totalPrice={totalPrice}
                                    fund={fund}
                                    totalQuantity={totalQuantity}
                                    format={format}
                                    setNewHoldingQuantity={setNewHoldingQuantity}
                                    setStep={setStep}
                                    setNewFund={setNewFund}
                                    setTotalPrice={setTotalPrice}
                                    setQuantity={setQuantity}
                                    setChangeRate={setChangeRate}
                                />
                            )}
                            {step === 2 && (
                                <Step2 
                                    format={format}
                                    company={company}
                                    nowPrice={nowPrice}
                                    quantity={quantity}
                                    totalPrice={totalPrice}
                                    loginUser={loginUser}
                                    fund={fund}
                                    totalQuantity={totalQuantity}
                                    newFund={newFund}
                                    newHoldingQuantity={newHoldingQuantity}
                                    setStep={setStep}
                                />
                            )}
                            {step === 3 && (
                                <>
                                注文が完了しました
                                </>
                            )}
                        </ThemeProvider>
                    </SectionPaper>
                </Container>
            </Grid>
        </Main>
    )
}

export default StockTradeForm
