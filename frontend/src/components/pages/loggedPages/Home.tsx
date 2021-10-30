import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { green, grey } from '@material-ui/core/colors'
import { TrendingDown, TrendingFlat, TrendingUp } from '@material-ui/icons'
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { getChangeRate } from '../../../functions/calculations'
import { MyStockInfo } from '../../../types/stock'
import ChangeRate from '../../atoms/ChangeRate'
import Section from '../../organisms/Section'
import Yen from '../../atoms/Yen'

const useStyles = makeStyles(theme => ({
    totalProfitOrLossPriceStyle: {
        textAlign: 'right',
        padding: theme.spacing(1, 2),
        borderRadius: '5px',
    },
    up: {
        color: theme.palette.success.main,
    },
    down: {
        color: theme.palette.secondary.main,
    },
    flat: {
        color: grey[500],
    },
    yen: {
        fontSize: '0.6em',
        marginLeft: '0.2em',
    }
}))

const Home: FC = () => {
    const classes = useStyles()
    const theme = useTheme()
    const totalProfitOrLossPriceUp = clsx(classes.totalProfitOrLossPriceStyle, classes.up)
    const totalProfitOrLossPriceDown = clsx(classes.totalProfitOrLossPriceStyle, classes.down)
    const totalProfitOrLossPriceFlat = clsx(classes.totalProfitOrLossPriceStyle, classes.flat)

    const myStockInfoList = useAppSelector(state => state.stock.myStockInfoList)
    const loginUser = useAppSelector(state => state.auth.loginUser)

    const totalAsset = myStockInfoList.reduce((sum: number, info: MyStockInfo) => {
        return sum + info.totalValue
    }, loginUser.fund)

    const totalProfitOrLossPrice = myStockInfoList.reduce((sum: number, info: MyStockInfo) => {
        return sum + info.profitOrLossPrice
    }, 0)
    return (
        <>
            <Grid item xs={12} lg={6}>
                <Section 
                    className="emphasis-paper"
                    title="評価損益額" 
                    height="100%"
                    backgroundColor={
                        totalProfitOrLossPrice > 0 ? theme.palette.success.light :
                        totalProfitOrLossPrice < 0 ? theme.palette.secondary.light :
                        grey[50]
                    }
                    color={
                        totalProfitOrLossPrice > 0 ? theme.palette.success.dark :
                        totalProfitOrLossPrice < 0 ? theme.palette.secondary.dark :
                        'textPrimary'
                    }
                >
                    <Typography 
                        component="div" 
                        variant="h2" 
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
                </Section>
            </Grid>
            <Grid item container direction="column" xs={12} lg={6}>
                <Section title="所持金">
                    <Typography component="div" variant="h3" style={{textAlign: 'right'}}>
                        {loginUser.fund.toLocaleString()}<Yen />
                    </Typography>
                </Section>
                <Section title="総資産">
                    <Typography component="div" variant="h3" style={{textAlign: 'right'}}>
                        {totalAsset.toLocaleString()}<Yen />
                    </Typography>
                </Section>
            </Grid>
        </>
    )
}

export default Home
