import { Box, Button, Divider, Grid, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, useTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { FC, memo, useCallback } from 'react'
import { Company, MyStockInfo } from '../../types/stock'
import Title from '../atoms/Title'
import NowPrice from '../molecules/NowPrice'
import { useHistory, Link } from 'react-router-dom'
import { getRoute } from '../../functions/router'
import BoughtStockInfo from '../molecules/BoughtStockInfo'
import BoughtStockInfoAndHead from '../molecules/BoughtStockInfoAndHead'

type Props = {
    myStockInfo: MyStockInfo;
}

const useStyles = makeStyles(theme => ({
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
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
    const { myStockInfo  } = props

    const handleClickSellButton = () => {
        history.push({
            pathname: getRoute('sellStockForm', myStockInfo.company.id), 
            state: { 
                format: 'sell',
                nowPrice: myStockInfo.company.nowPrice,
                totalQuantity: myStockInfo.totalQuantity,
                myStockInfo: myStockInfo,
            }
        })
    }

    return (
        <Paper>
            <Box pt={2} pb={1.5} px={2}>
                <Title component="h4" variant="subtitle1" color={theme.palette.primary.main}>
                    <span 
                        style={{cursor: 'pointer'}}
                        onClick={() => history.push(getRoute('stockDetail', myStockInfo.company.id))}
                    >
                        {myStockInfo.company.name}
                    </span>
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
                <BoughtStockInfoAndHead>
                    {myStockInfo.boughtStockInfoList.map(boughtStockInfo => (
                        <BoughtStockInfo 
                            key={boughtStockInfo.id} 
                            price={boughtStockInfo.price}
                            quantity={boughtStockInfo.quantity}
                            profitOrLossPrice={boughtStockInfo.profitOrLossPrice}
                        />
                    ))}
                </BoughtStockInfoAndHead>
                <Button 
                    variant="contained" 
                    fullWidth 
                    size="small" 
                    className={classes.sellButton}
                    onClick={handleClickSellButton}
                >
                    売却
                </Button>
            </Box>
        </Paper>
    )
})

export default HoldingStock
