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

const useStyles = makeStyles(theme => ({
    quantity: {
        width: 'calc(100% - 87px)',
        '& input': {
            textAlign: 'right',
            fontWeight: 'bold',
            width: 'calc(100% - 44px)',
        }
    },
    radioGroup: {
        flexDirection: 'row',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            '& .MuiRadio-root': {
                padding: theme.spacing(0.2)
            }
        }
    },
    table: {
        margin: theme.spacing(2, 0),
        '& th': {
            fontWeight: 'bold'
        },
        '& tr:last-of-type th': {
            borderBottom: 'none'
        },
        '& tr:last-of-type td': {
            borderBottom: 'none',
        },
        '& tr:nth-last-of-type(2) th': {
            borderBottom: '1px solid #777'
        },
        '& tr:nth-last-of-type(2) td': {
            borderBottom: '1px solid #777'
        },
    }
}))

type Props = {

}

type Params = {
    id: string;
}

const BuyStockForm: FC<Props> = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
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

    const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number((event.target as HTMLInputElement).value)

        if (value == 0) {
            let newQuantity = 100

            while(nowPrice * newQuantity < fund) {
                newQuantity += 100
            }
            newQuantity -= 100
            setParams(newQuantity)
        }
        setChangeRate(value)
    }

    const handleClickPlusOrMinus = (code: '+' | '-') => {
        let newQuantity: number

        if (code === '+') {
            newQuantity = quantity + changeRate
        } else {
            newQuantity = quantity - changeRate
        }

        if (newQuantity < 100 || newQuantity * nowPrice > fund) {
            return
        }

        setParams(newQuantity)
    }

    const setParams = (newQuantity: number) => {
        setQuantity(newQuantity)
        const newTotalPrice = nowPrice * newQuantity
        setTotalPrice(newTotalPrice)
        setRemainingFund(fund - newTotalPrice)
    }

    const handleClickBuyButton = async () => {
        dispatch(startLoading())
        const data = {
            price: nowPrice,
            quantity: quantity,
            user_id: loginUser.id,
            company_id: company.id
        }
    
        await dispatch(fetchAsyncCreateBoughtStockInfo(data))
        await dispatch(fetchAsyncPatchUser({user_id: loginUser.id, fund: remainingFund}))
        setStep(3)
        dispatch(endLoading())
    }

    return (
        <Main title='購入フォーム'>
            <Grid item xs={12}>
                <Container maxWidth="sm" style={{padding: 0}}>
                    <SectionPaper responsivePadding={true}>
                        {step === 1 && (
                            <>
                            <Box mb={4}>
                                <Title center={true}>数量の選択</Title>
                            </Box>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography component="h3" variant="h6" color="primary" >
                                        {company.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <span style={{fontSize: '0.875rem'}}>現在値：{nowPrice.toLocaleString()}</span>
                                </Grid>
                            </Grid>
                            <Box my={4}>
                                <Box mb={1}>
                                    <TextField 
                                        value={quantity}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: <InputAdornment position="end">株</InputAdornment>
                                        }}
                                        className={classes.quantity}
                                    />
                                    {changeRate != 0 && (
                                        <ButtonGroup color="secondary" style={{marginLeft: theme.spacing(1)}}>
                                            <Button onClick={() => handleClickPlusOrMinus('+')}>+</Button>
                                            <Button onClick={() => handleClickPlusOrMinus('-')}>-</Button>
                                        </ButtonGroup>
                                    )}
                                </Box>
                                <FormControl component="fieldset" fullWidth>
                                    <RadioGroup value={String(changeRate)} onChange={handleChangeRate} className={classes.radioGroup}>
                                        <FormControlLabel value="100" control={<Radio />} label="100ずつ" />
                                        <FormControlLabel value="500" control={<Radio />} label="500ずつ" />
                                        <FormControlLabel value="0" control={<Radio />} label="買えるだけ" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box mb={4}>
                                <Typography component="div" variant="h6" style={{textAlign: 'right', fontWeight: 'bold'}}>
                                    合計金額：{(totalPrice).toLocaleString()}円
                                </Typography>
                                <Typography style={{textAlign: 'right'}}>
                                    (資金：{fund.toLocaleString()}円)
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        size="small"
                                        onClick={() => history.goBack()}
                                    >
                                        戻る
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth size="small" 
                                        color="secondary"
                                        onClick={() => setStep(2)}
                                    >
                                        確認する
                                    </Button>
                                </Grid>
                            </Grid>
                            </>
                        )}
                        {step === 2 && (
                            <>
                            <Title center={true}>注文内容の確認</Title>
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th">銘柄名</TableCell>
                                        <TableCell align="right">{company.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th">現在値</TableCell>
                                        <TableCell align="right">{nowPrice.toLocaleString()}円</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th">数量</TableCell>
                                        <TableCell align="right">{quantity.toLocaleString()}株</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th">合計金額</TableCell>
                                        <TableCell align="right">
                                            <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{totalPrice.toLocaleString()}円</span>
                                            <br />
                                            (残り資金：{remainingFund.toLocaleString()}円)
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        size="small"
                                        onClick={() => setStep(1)}
                                    >
                                        戻る
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth size="small" 
                                        color="secondary"
                                        onClick={handleClickBuyButton}
                                    >
                                        購入
                                    </Button>
                                </Grid>
                            </Grid>
                            </>
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
