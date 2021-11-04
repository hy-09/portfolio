import { Button, Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { stockURL } from "../../router/AuthRoutes"
import { Company } from "../../types/stock"
import NowPrice from "../molecules/NowPrice"
import LineChart from "./LineChart"

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

    const buttons = (
        <Grid item container spacing={2} >
            <Grid item xs={12} sm={6}>
                <Button
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    onClick={() => history.push(stockURL)}
                >
                    銘柄一覧へ
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    size="small" 
                    color="secondary"
                >
                    購入
                </Button>
            </Grid>
        </Grid>
    )
    
    return (
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
    )
}

export default StockChart
