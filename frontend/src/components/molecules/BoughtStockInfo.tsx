import { Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import clsx from "clsx"

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
}))

type Props = {
    price: number;
    quantity: number;
    profitOrLossPrice: number;
}

const BoughtStockInfo: FC<Props> = (props) => {
    const classes = useStyles()
    const { price, quantity, profitOrLossPrice } = props
    const profit = clsx(classes.profitOrLossPrice, classes.plus)
    const loss = clsx(classes.profitOrLossPrice, classes.minus)
    const noChange = clsx(classes.profitOrLossPrice, classes.flat)
    
    return (
        <Grid container justifyContent="space-around" style={{marginTop: '-6px', fontSize: '0.8rem'}}>
            <Grid item>
                {price.toLocaleString()}（{quantity.toLocaleString()}株）
            </Grid>
            <Grid item>
                <span
                    className={
                        profitOrLossPrice > 0 ? profit :
                        profitOrLossPrice < 0 ? loss :
                        noChange
                    }
                >
                    {profitOrLossPrice > 0 && '+'}
                    {profitOrLossPrice === 0 && '±'}
                    {profitOrLossPrice.toLocaleString()}
                </span>
            </Grid>
        </Grid>
    )
}

export default BoughtStockInfo
