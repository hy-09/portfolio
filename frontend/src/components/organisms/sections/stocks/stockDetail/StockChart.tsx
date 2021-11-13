import { Grid, makeStyles } from "@material-ui/core"
import { FC, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector } from "../../../../../app/hooks"
import { getRoute } from "../../../../../functions/router"
import { Company } from "../../../../../types/stock"
import ErrorMessage from "../../../../atoms/ErrorMessage"
import NowPrice from "../../../../molecules/NowPrice"
import TwoButtons from "../../../../molecules/TwoButtons"
import LineChart from "../../../LineChart"
import SectionPaper from "../../../SectionPaper"

const useStyles = makeStyles(theme => ({
    nowPrice: {
        order: 1,
        [theme.breakpoints.down('xs')]: {
            order: 1
        }
    },
    buttons: {
        order: 2,
        [theme.breakpoints.down('xs')]: {
            order: 3
        }
    },
    lineChart: {
        order: 3,
        [theme.breakpoints.down('xs')]: {
            order: 2
        }
    },
}))

type Props = {
    company: Company;
}

const StockChart: FC<Props> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const { company } = props
    const fund = useAppSelector(state => state.auth.loginUser.fund)
    const myStockInfo = useAppSelector(state => state.stock.myStockInfoList.find(i => i.company.id === company.id))
    const [showMessage, setShowMessage] = useState(false)

    const handleClickBuyButton = () => {
        if (fund < company.nowPrice * 100) {
            setShowMessage(true)
            return
        }
        history.push({ 
            pathname: getRoute('buyStockForm', company.id), 
            state: { 
                format: 'buy',
                company: company,
                totalQuantity: myStockInfo ? myStockInfo.totalQuantity : 0,
                myStockInfo: myStockInfo,
            }
        })
    }

    const buttons = (
        <>
        <TwoButtons
            button1Label="戻る"
            button2Label="購入"
            button2Color='secondary'
            onClickButton1={() => history.goBack()}
            onClickButton2={handleClickBuyButton}
        />
        <ErrorMessage show={showMessage} message="資金が足りません（100株以上から購入が可能です）" />
        </>
    )

    return (
        <Grid item xs={12}>
            <SectionPaper responsivePadding={true}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} className={classes.nowPrice}>
                        <NowPrice company={company} fontSize="1rem" />
                    </Grid>
                    <Grid item container sm={6} className={classes.buttons}>
                        {buttons}
                    </Grid>
                    <Grid item xs={12} className={classes.lineChart}>
                        <LineChart dataList={company.stockPriceDatas} />
                    </Grid>
                </Grid>
            </SectionPaper>
        </Grid>
    )
}

export default StockChart
