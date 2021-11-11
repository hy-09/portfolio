import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import Title from "../../../atoms/Title"
import Yen from "../../../atoms/Yen"
import SectionPaper from "../../SectionPaper"
import clsx from 'clsx'
import { useAppSelector } from "../../../../app/hooks"
import { MyStockInfo } from "../../../../types/stock"
import { green, grey, pink } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
    totalProfitOrLossPriceStyle: {
        textAlign: 'right',
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            textAlign: 'center',
            transform: 'translateY(-50%) translateX(-50%)',
            padding: theme.spacing(0, 2)
        }
    },
    up: {
        color: theme.palette.success.main,
    },
    down: {
        color: theme.palette.secondary.main,
    },
    flat: {
        color: theme.palette.text.secondary,
    },
    yen: {
        fontSize: '0.6em',
        marginLeft: '0.2em',
    },
}))

const PriceStatuses: FC = () => {
    const classes = useStyles()
    const theme = useTheme()


    const totalProfitOrLossPriceUp = clsx(classes.totalProfitOrLossPriceStyle, classes.up)
    const totalProfitOrLossPriceDown = clsx(classes.totalProfitOrLossPriceStyle, classes.down)
    const totalProfitOrLossPriceFlat = clsx(classes.totalProfitOrLossPriceStyle, classes.flat)

    const companies = useAppSelector(state => state.stock.companies)
    const myStockInfoList = useAppSelector(state => state.stock.myStockInfoList)
    const loginUser = useAppSelector(state => state.auth.loginUser)

    const totalAsset = myStockInfoList.reduce((sum: number, info: MyStockInfo) => {
        return sum + info.totalValue
    }, loginUser.fund)

    const totalProfitOrLossPrice = myStockInfoList.reduce((sum: number, info: MyStockInfo) => {
        return sum + info.profitOrLossPrice
    }, 0)
    
    return (
        <Grid item container>
            <Grid item xs={12} lg={6}>
                <SectionPaper
                    style={{position: 'relative'}}
                    className="emphasis-paper"
                    height="100%"
                    backgroundColor={
                        totalProfitOrLossPrice > 0 ? green[50] :
                        totalProfitOrLossPrice < 0 ? pink[50] :
                        grey[50]
                    }
                >
                    <Title
                        color={
                            totalProfitOrLossPrice > 0 ? theme.palette.success.dark :
                            totalProfitOrLossPrice < 0 ? theme.palette.secondary.dark :
                            'textPrimary'
                        }
                    >
                            評価損益額
                        </Title>
                    <Typography 
                        component="div" 
                        variant="h3" 
                        className={
                            totalProfitOrLossPrice > 0 ? totalProfitOrLossPriceUp :
                            totalProfitOrLossPrice < 0 ? totalProfitOrLossPriceDown :
                            totalProfitOrLossPriceFlat
                        }
                    >
                        {totalProfitOrLossPrice > 0 && '+'}
                        {totalProfitOrLossPrice === 0 && '±'}
                        {totalProfitOrLossPrice.toLocaleString()}<Yen />
                    </Typography>
                </SectionPaper>
            </Grid>
            <Grid item container direction="column" xs={12} lg={6}>
                <SectionPaper>
                    <Title>所持金</Title>
                    <Typography component="div" variant="h4" style={{textAlign: 'right'}}>
                        {loginUser.fund.toLocaleString()}<Yen />
                    </Typography>
                </SectionPaper>
                <SectionPaper>
                    <Title>総資産</Title>
                    <Typography component="div" variant="h4" style={{textAlign: 'right'}}>
                        {totalAsset.toLocaleString()}<Yen />
                    </Typography>
                </SectionPaper>
            </Grid>
        </Grid>
    )
}

export default PriceStatuses
