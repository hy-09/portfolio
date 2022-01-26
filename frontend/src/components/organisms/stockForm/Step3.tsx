import { Box, makeStyles, Table, TableBody, TableCell, TableRow, TextField, useTheme } from "@material-ui/core"
import { FC, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { endLoading, handleOpenNotifyAndBackdrop, startLoading } from "../../../slices/othersSlice"
import { Company } from "../../../types/stock"
import { User } from "../../../types/user"
import Title from "../../atoms/Title"
import { getRoute } from "../../../functions/router"
import TwoButtons from "../../molecules/TwoButtons"
import { grey } from "@material-ui/core/colors"
import SmallButton from "../../atoms/SmallButton"
import ErrorMessage from "../../atoms/ErrorMessage"
import { fetchAsyncCreatePost } from "../../../slices/postSlice"
import { escapeHtml } from "../../../functions/escape"
import { CreatPost } from "../../../types/post"
import NumberWithCodeAndColor from "../../atoms/NumberWithCodeAndColor"

const useStyles = makeStyles(theme => ({
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
        backgroundColor: grey[50],
        padding: theme.spacing(0, 2),
        margin: theme.spacing(4, 0, 3),
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        whiteSpace: 'nowrap',
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
}))

type Props = {
    format: 'buy' | 'sell';
    company: Company;
    nowPrice: number;
    quantity: number;
    loginUser: User;
    profitOrLossPrice: number | null;
    color: 'primary' | 'secondary';
    titleClass: string;
}

const Step3: FC<Props> = (props) => {
    const {
        format,
        company,
        nowPrice,
        quantity,
        loginUser,
        profitOrLossPrice,
        color,
        titleClass,
    } = props

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const history = useHistory()
    const [showTextarea, setShowTextarea] = useState(false)
    const [postcontent, setPostcontent] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    const handleClickPostButton = async () => {
        if (postcontent === '') {
            setShowMessage(true)
            return
        }
        await dispatch(startLoading())

        const date = new Date()
        const datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`

        const data: CreatPost = {
            content: escapeHtml(postcontent).split('\n').join('<br>'),
            price: nowPrice,
            quantity: quantity,
            buy_or_sell: format,
            profit_or_loss_price: profitOrLossPrice,
            user_id: loginUser.id,
            company_id: company.id,
            created_at: datetime,
        }
        
        const res = await dispatch(fetchAsyncCreatePost(data))
        if (fetchAsyncCreatePost.fulfilled.match(res)) {
            history.push(getRoute('home'))
            
            dispatch(handleOpenNotifyAndBackdrop({
                message: '投稿しました',
                type: 'success'
            }))
        }
        dispatch(endLoading())
    }
    
    return (
        <>
            <Title center={true} className={titleClass}>注文が完了しました</Title>
            <TwoButtons
                button1Label="ホームに戻る"
                button2Label="この注文のコメントを投稿"
                button2Color={color}
                button2Variant={showTextarea ? 'outlined' : 'contained'}
                onClickButton1={() => history.push(getRoute('home'))}
                onClickButton2={() => setShowTextarea(!showTextarea)}
            />
            {showTextarea && (
                <>
                <div className={classes.tableWrapper}>
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
                            {format === 'sell' && (
                                <TableRow>
                                    <TableCell component="th">損益額</TableCell>
                                    <TableCell align="right">
                                        <NumberWithCodeAndColor num={profitOrLossPrice!}>
                                            円
                                        </NumberWithCodeAndColor>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Box mb={3}>
                    <TextField 
                        label="コメント"
                        multiline
                        maxRows={4}
                        value={postcontent}
                        fullWidth
                        color={color}
                        onChange={e => setPostcontent(e.target.value)} 
                    />
                </Box>
                <ErrorMessage show={showMessage} message="コメントが入力されていません" />
                <SmallButton
                    color={color}
                    variant="contained"
                    label="投稿する"
                    onClick={handleClickPostButton}
                />
                </>
            )}
        </>
    )
}

export default Step3
