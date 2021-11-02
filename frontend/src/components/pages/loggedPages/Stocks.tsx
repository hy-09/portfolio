import { Box, Button, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { FC, memo, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import DivWithPadding from '../../atoms/DivWithPadding'
import Title from '../../atoms/Title'
import NowPrice from '../../molecules/NowPrice'
import LineChart from '../../organisms/LineChart'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    detailButton: {
        backgroundColor: theme.palette.secondary.main, 
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}))

const Stocks: FC = memo(() => {
    const classes = useStyles()
    const theme = useTheme()
    const companies = useAppSelector(state => state.stock.companies)

    return (
        <>
        {companies.map(company => (
            <Grid 
                item 
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                key={company.id}
            >
                <DivWithPadding>
                    <Paper className={classes.paper}>
                        <Title component="h4" variant="subtitle1" color={theme.palette.primary.main} >
                            {company.name}
                        </Title>
                        <NowPrice company={company} />
                        <Box mt={0.5}>
                            <LineChart dataList={company.stockPriceDatas.slice(-20)} />
                        </Box>
                        <Button size="small" variant="outlined" fullWidth color="secondary">
                            詳細
                        </Button>
                    </Paper>
                </DivWithPadding>
            </Grid>
        ))}
        </>
    )
})

export default Stocks
