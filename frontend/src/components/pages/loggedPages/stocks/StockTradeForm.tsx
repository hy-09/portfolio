import {  Container, createTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core"
import { FC, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import { getRoute } from "../../../../functions/router"
import { Company, MyStockInfo } from "../../../../types/stock"
import Main from "../../../organisms/layout/Main"
import SectionPaper from "../../../organisms/SectionPaper"
import Step1 from "../../../organisms/stockForm/Step1"
import Step2 from "../../../organisms/stockForm/Step2"
import Step3 from "../../../organisms/stockForm/Step3"

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3'
        },
    },
})

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4)
    },
}))

type Location = {
    company: Company;
    format: 'buy' | 'sell';
    totalQuantity: number;
    myStockInfo: MyStockInfo;
}

const StockTradeForm: FC = () => {
    const history = useHistory()
    const classes = useStyles()
    const { state } = useLocation<Location>()
    if (!state) {
        history.push(getRoute('home'))
        window.location.reload()
    }
    
    const { company, format, totalQuantity, myStockInfo } = state
    const nowPrice = company.nowPrice
    const loginUser = useAppSelector(state => state.auth.loginUser)
    const fund = loginUser.fund
    const [quantity, setQuantity] = useState(100)
    const [changeRate, setChangeRate] = useState(100)
    const [totalPrice, setTotalPrice] = useState(nowPrice * quantity)
    const [newFund, setNewFund] = useState(format === 'buy' ? fund - totalPrice : fund + totalPrice)
    const [newHoldingQuantity, setNewHoldingQuantity] = useState(format === 'buy' ? totalQuantity + quantity : totalQuantity - quantity)
    const [profitOrLossPrice, setProfitOrLossPrice] = useState(0)
    const [step, setStep] = useState(1)
    const color = format === 'buy' ? 'secondary' : 'primary'

    if (company == undefined || company.id == 0) {
        if (format === 'buy') {
            history.push(getRoute('stocks'))

        } else {
            history.push(getRoute('home'))
        }
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
                                    color={color}
                                    titleClass={classes.title}
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
                                    myStockInfo={myStockInfo}
                                    color={color}
                                    titleClass={classes.title}
                                    setStep={setStep}
                                    setProfitOrLossPrice={setProfitOrLossPrice}
                                />
                            )}
                            {step === 3 && (
                                <Step3
                                    format={format}
                                    company={company}
                                    nowPrice={nowPrice}
                                    quantity={quantity}
                                    loginUser={loginUser}
                                    profitOrLossPrice={profitOrLossPrice}
                                    color={color}
                                    titleClass={classes.title}
                                />
                            )}
                        </ThemeProvider>
                    </SectionPaper>
                </Container>
            </Grid>
        </Main>
    )
}

export default StockTradeForm
