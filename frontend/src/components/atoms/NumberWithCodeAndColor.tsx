import { makeStyles } from "@material-ui/core"
import { FC, ReactNode } from "react"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
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
    num: number;
    children?: ReactNode;
    className?: string;
}

const NumberWithCodeAndColor: FC<Props> = (props) => {
    const classes = useStyles()
    const { num, children, className='' } = props
    
    return (
        <span
            className={
                num! > 0 ? clsx(className, classes.plus) :
                num! < 0 ? clsx(className, classes.minus) :
                clsx(className, classes.flat)
            }
        >
            {num! > 0 && '+'}
            {num === 0 && '±'}
            {num!.toLocaleString()}
            {children}
        </span>
    )
}

export default NumberWithCodeAndColor
