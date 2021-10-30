import { makeStyles } from "@material-ui/core"
import clsx from 'clsx'
import { FC } from "react"

const useStyles = makeStyles(theme => ({
    root: {
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'inline-block',
        padding: theme.spacing(0.5, 1),
        borderRadius: '10%',
    },
    plus: {
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.light,
    },
    minus: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
    },
    flat: {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.grey[100],
    },
}))


type Props = {
    rate: number;
}

const ChangeRate: FC<Props> = (props) => {
    const { rate } = props
    const classes = useStyles()
    const plusRate = clsx(classes.root, classes.plus)
    const minusRate = clsx(classes.root, classes.minus)
    const flatRate = clsx(classes.root, classes.flat)

    return (
        <>
        {rate > 0 && (
            <div className={plusRate}>
                +{rate}%
            </div>
        )}
        {rate < 0 && (
            <div className={minusRate}>
                {rate}%
            </div>
        )}
        {rate === 0 && (
            <div className={flatRate}>
                ±0%
            </div>
        )}
        </>
    )
}

export default ChangeRate
