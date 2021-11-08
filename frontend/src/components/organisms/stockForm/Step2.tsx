import { Box, Button, ButtonGroup, FormControl, FormControlLabel, Grid, InputAdornment, makeStyles, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { fetchAsyncPatchUser } from "../../../slices/authSlice"
import { endLoading, startLoading } from "../../../slices/othersSlice"
import { fetchAsyncCreateBoughtStockInfo, fetchAsyncDeleteBoughtStockInfo, fetchAsyncPatchBoughtStockInfo } from "../../../slices/stockSlice"
import { Company, MyStockInfo } from "../../../types/stock"
import { User } from "../../../types/user"
import Title from "../../atoms/Title"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(2)
    },
    tableWrapper: {
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            height: '5px'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bbb',
            borderRadius: '10px'
        },
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        whiteSpace: 'nowrap',
        '& thead th': {
            paddingBottom: theme.spacing(0)
        },
        '& th': {
            fontWeight: 'bold'
        },
        '& tr:last-of-type th': {
            borderBottom: 'none'
        },
        '& tr:last-of-type td': {
            borderBottom: 'none',
        },
    },
    table1: {
        '& tr:nth-last-of-type(2) th': {
            borderBottom: '1px solid #777'
        },
        '& tr:nth-last-of-type(2) td': {
            borderBottom: '1px solid #777'
        },
    },
    table2Wrapper: {
        margin: theme.spacing(4, 0, 3),
        backgroundColor: '#f7f7f7',
        borderRadius: '5px',
        padding: theme.spacing(2, 2, 1, 2),
    }
}))

type Props = {
    format: 'buy' | 'sell';
    company: Company;
    nowPrice: number;
    quantity: number;
    totalPrice: number;
    loginUser: User;
    fund: number;
    totalQuantity: number;
    newFund: number;
    newHoldingQuantity: number;
    myStockInfo?: MyStockInfo;
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
        fund,
        totalQuantity,
        newFund,
        newHoldingQuantity,
        myStockInfo,
        setStep,
    } = props

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const handleClickOrderButton = async () => {
        dispatch(startLoading())

        if (format === 'buy') {
            const data = {
                price: nowPrice,
                quantity: quantity,
                user_id: loginUser.id,
                company_id: company.id
            }
        
            await dispatch(fetchAsyncCreateBoughtStockInfo(data))
            
        } else {
            let tmpQuantity = quantity

            for(const boughtStockInfo of myStockInfo!.boughtStockInfoList) {

                if (tmpQuantity >= boughtStockInfo.quantity) {
                    await dispatch(fetchAsyncDeleteBoughtStockInfo({
                        id: boughtStockInfo.id,
                        companyId: company.id,
                        tradingQuantity: boughtStockInfo.quantity,
                    }))

                } else {
                    await dispatch(fetchAsyncPatchBoughtStockInfo({
                        id: boughtStockInfo.id, 
                        quantity: boughtStockInfo.quantity - tmpQuantity,
                        tradingQuantity: tmpQuantity,
                    }))
                }

                tmpQuantity -= boughtStockInfo.quantity

                if (tmpQuantity <= 0) break
            }
        }
        await dispatch(fetchAsyncPatchUser({
            user_id: loginUser.id, 
            fund: newFund
        }))
        setStep(3)
        dispatch(endLoading())
    }
    
    return (
        <>
        <div>
            <Title center={true} className={classes.title}>注文内容の確認</Title>
            <div className={classes.tableWrapper}>
                <Table className={clsx(classes.table, classes.table1)}>
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
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        <div className={classes.table2Wrapper}>
            <Title center={true} className={classes.title}>注文前後の変動</Title>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">注文前</TableCell>
                            <TableCell align="right">注文後</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th">株数</TableCell>
                            <TableCell align="right">
                                {totalQuantity.toLocaleString()}株
                            </TableCell>
                            <TableCell align="right">
                                {newHoldingQuantity.toLocaleString()}株
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">資金</TableCell>
                            <TableCell align="right">{fund.toLocaleString()}円</TableCell>
                            <TableCell align="right">
                                
                                {newFund.toLocaleString()}円
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
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
                    onClick={handleClickOrderButton}
                >
                    {format === 'buy' ? '購入' : '売却'}
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Step2
