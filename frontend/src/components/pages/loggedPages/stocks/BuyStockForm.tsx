import { Box, Button, ButtonGroup, Container, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableRow, TextField, Typography, useTheme } from "@material-ui/core"
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

type Params = {
    id: string;
}

const BuyStockForm: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const { id } = useParams<Params>()
    const { state } = useLocation<number>()
    const nowPrice: number = state
    const companies = useAppSelector(state => state.stock.companies)
    const company = companies.find(company => company.id === Number(id))!
    const loginUser = useAppSelector(state => state.auth.loginUser)
    const fund = loginUser.fund
    const [quantity, setQuantity] = useState(100)
    const [changeRate, setChangeRate] = useState(100)
    const [totalPrice, setTotalPrice] = useState(nowPrice * quantity)
    const [remainingFund, setRemainingFund] = useState(fund - totalPrice)
    const [step, setStep] = useState(1)
    
    if (company == undefined || company.id == 0) {
        history.push(getRoute('stocks'))
        window.location.reload()
    }

    return (
        <Main title='購入フォーム'>
            <Grid item xs={12}>
                <Container maxWidth="sm" style={{padding: 0}}>
                    <SectionPaper responsivePadding={true}>
                        {step === 1 && (
                            <Step1 
                                company={company}
                                nowPrice={nowPrice}
                                quantity={quantity}
                                changeRate={changeRate}
                                totalPrice={totalPrice}
                                fund={fund}
                                setStep={setStep}
                                setRemainingFund={setRemainingFund}
                                setTotalPrice={setTotalPrice}
                                setQuantity={setQuantity}
                                setChangeRate={setChangeRate}
                            />
                        )}
                        {step === 2 && (
                            <Step2 
                                company={company}
                                nowPrice={nowPrice}
                                quantity={quantity}
                                totalPrice={totalPrice}
                                loginUser={loginUser}
                                remainingFund={remainingFund}
                                setStep={setStep}
                            />
                        )}
                        {step === 3 && (
                            <>
                            注文が完了しました
                            </>
                        )}
                    </SectionPaper>
                </Container>
            </Grid>
        </Main>
    )
}

export default BuyStockForm
