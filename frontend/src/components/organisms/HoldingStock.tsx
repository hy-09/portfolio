import { Box, Grid, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, useTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { FC, memo } from 'react'
import { MyStockInfo } from '../../types/stock'
import ChangeRate from '../atoms/ChangeRate'

type Props = {
    myStockInfo: MyStockInfo;
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    table: {
        '& th': {
            color: grey[600],
            padding: theme.spacing(0, 0, 0.5),
        },
        '& td': {
            padding: theme.spacing(0.05, 0),
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    }
}))

const HoldingStock: FC<Props> = memo((props) => {
    const classes = useStyles(props)
    const theme = useTheme()
    const { myStockInfo  } = props

    return (
        <Paper className="emphasis-paper">
            <Box pt={2} pb={1} px={2} style={{backgroundColor: grey[50]}}>
                <Typography component="h3" variant="subtitle1" color="primary" >
                    {myStockInfo.company.name}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span style={{marginRight: theme.spacing(0.7)}}>
                            現在値：{myStockInfo.company.nowPrice.toLocaleString()}
                        </span>
                        <ChangeRate
                            rate={myStockInfo.company.StockPriceChangeRate}
                        />
                    </div>
                    <span style={{fontWeight: 'bold', color: theme.palette.text.secondary}}>
                        {myStockInfo.totalQuantity.toLocaleString()}株
                    </span>
                </div>
            </Box>
            <Box p={2}>
                <TableContainer component="div">
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">取得単価（株数）</TableCell>
                                <TableCell align="center">評価損益額</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myStockInfo.boughtStockInfoList.map(boughtStockInfo => (
                                <TableRow key={boughtStockInfo.id}>
                                    <TableCell align="center">
                                        {boughtStockInfo.price.toLocaleString()}（{boughtStockInfo.quantity.toLocaleString()}株）
                                    </TableCell>
                                    <TableCell align="center">
                                        {boughtStockInfo.profitOrLossPrice.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    )
})

export default HoldingStock
