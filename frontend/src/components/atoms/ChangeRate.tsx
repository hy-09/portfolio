import { makeStyles, Theme } from "@material-ui/core"
import { green, pink } from "@material-ui/core/colors"
import { TrendingDown, TrendingFlat, TrendingUp } from "@material-ui/icons"
import clsx from 'clsx'
import { FC } from "react"

const useStyles = makeStyles<Theme, Props>(theme => ({
    root: {
        fontWeight: 'bold',
        fontSize: props => props.fontSize ? props.fontSize : '0.7rem',
        padding: props => props.padding ? props.padding : theme.spacing(0.3, 0.7),
        borderRadius: props => props.borderRadius ? props.borderRadius : theme.spacing(0.5),
        display: 'inline-flex',
        alignItems: 'center',
    },
    trending: {
        fontSize: '1.3em',
        marginLeft: '0.1em'
    },
    plus: {
        color: theme.palette.success.main,
        backgroundColor: green[50],
    },
    minus: {
        color: theme.palette.secondary.main,
        backgroundColor: pink[50],
    },
    flat: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.grey[100],
    },
}))


type Props = {
    rate: number;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
}

const ChangeRate: FC<Props> = (props) => {
    const { rate } = props
    const classes = useStyles(props)
    const plusRate = clsx(classes.root, classes.plus)
    const minusRate = clsx(classes.root, classes.minus)
    const flatRate = clsx(classes.root, classes.flat)
    const trendingUp = clsx(classes.trending, classes.plus)
    const trendingMinus = clsx(classes.trending, classes.minus)
    const trendingFlat = clsx(classes.trending, classes.flat)

    return (
        <>
        {rate > 0 && (
            <div className={plusRate}>
                +{rate}%
                <TrendingUp className={trendingUp} />
            </div>
        )}
        {rate < 0 && (
            <div className={minusRate}>
                {rate}%
                <TrendingDown className={trendingMinus} />
            </div>
        )}
        {rate === 0 && (
            <div className={flatRate}>
                ±0%
                <TrendingFlat className={trendingFlat} />
            </div>
        )}
        </>
    )
}

export default ChangeRate
