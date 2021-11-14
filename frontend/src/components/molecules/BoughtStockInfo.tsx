import { Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import NumberWithCodeAndColor from "../atoms/NumberWithCodeAndColor"

const useStyles = makeStyles(theme => ({
    profitOrLossPrice: {
        padding: theme.spacing(0.3, 0.7),
        display: 'inline-flex',
        alignItems: 'center',
    },
}))

type Props = {
    price: number;
    quantity: number;
    profitOrLossPrice: number;
}

const BoughtStockInfo: FC<Props> = (props) => {
    const classes = useStyles()
    const { price, quantity, profitOrLossPrice } = props
    
    return (
        <Grid container justifyContent="space-around" style={{marginTop: '-6px', fontSize: '0.8rem'}}>
            <Grid item>
                {price.toLocaleString()}（{quantity.toLocaleString()}株）
            </Grid>
            <Grid item>
                <NumberWithCodeAndColor className={classes.profitOrLossPrice} num={profitOrLossPrice} />
            </Grid>
        </Grid>
    )
}

export default BoughtStockInfo
