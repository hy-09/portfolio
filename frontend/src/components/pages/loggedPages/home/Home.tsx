import { Box, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { green, grey } from '@material-ui/core/colors'
import { TrendingDown, TrendingFlat, TrendingUp } from '@material-ui/icons'
import { FC, memo, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { getChangeRate } from '../../../../functions/calculations'
import { Company, MyStockInfo } from '../../../../types/stock'
import ChangeRate from '../../../atoms/ChangeRate'
import Section from '../../../organisms/Section'
import Yen from '../../../atoms/Yen'
import HoldingStock from '../../../organisms/HoldingStock'
import Main from '../../../organisms/layout/Main'

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

const Home: FC = memo(() => {
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
        <>
        <Main title="ホーム" >
            <Grid item xs={12} lg={6}>
                <Section 
                    style={{position: 'relative'}}
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
                </Section>
            </Grid>
            <Grid item container direction="column" xs={12} lg={6}>
                <Section title="所持金">
                    <Typography component="div" variant="h4" style={{textAlign: 'right'}}>
                        {loginUser.fund.toLocaleString()}<Yen />
                    </Typography>
                </Section>
                <Section title="総資産">
                    <Typography component="div" variant="h4" style={{textAlign: 'right'}}>
                        {totalAsset.toLocaleString()}<Yen />
                    </Typography>
                </Section>
            </Grid>
            <Grid item xs={12}>
                <Section title="保有銘柄" backgroundColor="transparent" className="no-shadow">
                    {myStockInfoList.length > 0 ? (
                        <Grid 
                            container
                            spacing={2} 
                        >
                                {myStockInfoList.map(myStockInfo => (
                                    <Grid 
                                        item 
                                        xs={12}
                                        sm={6}
                                        lg={4}
                                        xl={3}
                                        key={myStockInfo.company.id}
                                    >
                                        <HoldingStock myStockInfo={myStockInfo} />
                                    </Grid>
                                ))}
                        </Grid>
                    ) : (
                        <p>
                            保有している銘柄はございません
                        </p>
                    )}
                </Section>
            </Grid>
        </Main>
        </>
    )
})

export default Home
