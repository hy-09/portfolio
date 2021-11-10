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
import { getRoute } from "../../../functions/router"
import TwoButtons from "../../molecules/TwoButtons"

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(2)
    },
}))

type Props = {
    format: 'buy' | 'sell';
    company: Company;
    nowPrice: number;
    quantity: number;
    loginUser: User;
}

const Step3: FC<Props> = (props) => {
    const {
        format,
        company,
        nowPrice,
        quantity,
        loginUser,
    } = props

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const history = useHistory()

    const handleClickPostButton = async () => {
        dispatch(startLoading())
        dispatch(endLoading())
    }
    
    return (
        <>
            <Title center={true} className={classes.title}>注文が完了しました</Title>
            <TwoButtons
                button1Label="ホームに戻る"
                button2Label="この注文のコメントを残す"
                button2Color={format === 'buy' ? 'secondary' : 'primary'}
                onClickButton1={() => history.push(getRoute('home'))}
                onClickButton2={() => history.push(getRoute('home'))}
            />
        </>
    )
}

export default Step3
