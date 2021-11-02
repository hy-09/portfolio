import { Box, Button, Divider, Grid, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, useTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { FC, memo } from 'react'
import { MyStockInfo } from '../../types/stock'
import ChangeRate from '../atoms/ChangeRate'
import clsx from 'clsx'
import Title from '../atoms/Title'
import NowPrice from '../molecules/NowPrice'

type Props = {
    myStockInfo: MyStockInfo;
}

const useStyles = makeStyles(theme => ({
    profitOrLossPrice: {
        padding: theme.spacing(0.3, 0.7),
        borderRadius:  theme.spacing(0.5),
        display: 'inline-flex',
        alignItems: 'center',
    },
    plus: {
        color: theme.palette.success.main,
    },
    minus: {
        color: theme.palette.secondary.main,
    },
    flat: {
        color: theme.palette.text.secondary,
    },
    // table: {
    //     '& th': {
    //         color: grey[600],
    //         padding: theme.spacing(0, 0.5, 0.5),
    //     },
    //     '& td': {
    //         padding: theme.spacing(0, 0.5),
    //     },
    //     '& .MuiTableCell-root': {
    //         border: 'none'
    //     }
    // },
    sellButton: {
        marginTop: theme.spacing(2), 
        backgroundColor: theme.palette.info.main, 
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        }
    }
}))

const HoldingStock: FC<Props> = memo((props) => {
    const classes = useStyles()
    const theme = useTheme()
    const { myStockInfo  } = props
    const profit = clsx(classes.profitOrLossPrice, classes.plus)
    const loss = clsx(classes.profitOrLossPrice, classes.minus)
    const noChange = clsx(classes.profitOrLossPrice, classes.flat)

    return (
        <Paper className="emphasis-paper">
            <Box pt={2} pb={1.5} px={2}>
                <Title component="h4" variant="subtitle1" color={theme.palette.primary.main}>
                    {myStockInfo.company.name}
                </Title>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <NowPrice company={myStockInfo.company} />
                    <span style={{fontWeight: 'bold', color: theme.palette.text.secondary}}>
                        {myStockInfo.totalQuantity.toLocaleString()}株
                    </span>
                </div>
            </Box>
            <Divider />
            <Box p={2}>
                <div>
                    <Grid container justifyContent="space-evenly" style={{color: grey[600], marginBottom: theme.spacing(1.2)}}>
                        <Grid item>
                            取得単価（株数）
                        </Grid>
                        <Grid item>
                            評価損益額
                        </Grid>
                    </Grid>
                    {myStockInfo.boughtStockInfoList.map(boughtStockInfo => (
                        <Grid container justifyContent="space-evenly" style={{marginTop: '-6px', fontSize: '0.8rem'}}>
                            <Grid item>
                                {boughtStockInfo.price.toLocaleString()}（{boughtStockInfo.quantity.toLocaleString()}株）
                            </Grid>
                            <Grid item>
                                <span
                                    className={
                                        boughtStockInfo.profitOrLossPrice > 0 ? profit :
                                        boughtStockInfo.profitOrLossPrice < 0 ? loss :
                                        noChange
                                    }
                                >
                                    {boughtStockInfo.profitOrLossPrice > 0 && '+'}
                                    {boughtStockInfo.profitOrLossPrice === 0 && '±'}
                                    {boughtStockInfo.profitOrLossPrice.toLocaleString()}
                                </span>
                            </Grid>
                        </Grid>
                    ))}
                </div>
                <Button variant="contained" fullWidth size="small" className={classes.sellButton}>
                    売却
                </Button>
            </Box>
        </Paper>
    )
})

export default HoldingStock
