import { Box, Button, ButtonGroup, FormControl, FormControlLabel, Grid, InputAdornment, makeStyles, Radio, RadioGroup, Table, TableBody, TableCell, TableRow, TextField, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { fetchAsyncPatchUser } from "../../../slices/authSlice"
import { endLoading, startLoading } from "../../../slices/othersSlice"
import { fetchAsyncCreateBoughtStockInfo } from "../../../slices/stockSlice"
import { Company } from "../../../types/stock"
import { User } from "../../../types/user"
import Title from "../../atoms/Title"

const useStyles = makeStyles(theme => ({
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
    format: 'buy' | 'sell';
    company: Company;
    nowPrice: number;
    quantity: number;
    totalPrice: number;
    loginUser: User;
    newFund: number;
    newQuantity: number;
    setStep: (num: number) => void;
}

const Step2: FC<Props> = (props) => {
    const {
        format,
        company,
        nowPrice,
        quantity,
        totalPrice,
        loginUser,
        newFund,
        newQuantity,
        setStep,
    } = props

    const classes = useStyles()
    const dispatch = useAppDispatch()

    const handleClickBuyButton = async () => {
        dispatch(startLoading())
        const data = {
            price: nowPrice,
            quantity: quantity,
            user_id: loginUser.id,
            company_id: company.id
        }
    
        await dispatch(fetchAsyncCreateBoughtStockInfo(data))
        await dispatch(fetchAsyncPatchUser({user_id: loginUser.id, fund: newFund}))
        setStep(3)
        dispatch(endLoading())
    }
    
    return (
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
                        (残り株数：{newQuantity.toLocaleString()}株)
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
                    color={format === 'buy' ? 'secondary' : 'primary'}
                    onClick={handleClickBuyButton}
                >
                    {format === 'buy' ? '購入' : '売却'}
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Step2
