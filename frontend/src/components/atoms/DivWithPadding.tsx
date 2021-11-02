import { makeStyles, Theme } from "@material-ui/core"
import { FC, ReactNode } from "react"

const useStyles = makeStyles<Theme, Props>(theme => ({
    root: {
        padding: theme.spacing(2, 0, 0, 2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3, 0, 0, 3),
        },
        width: '100%',
        height: (props) => props.height ? props.height : 'auto',
    }
}))

type Props = {
    height?: string;
    children: ReactNode;
}

const DivWithPadding: FC<Props> = (props) => {
    const classes = useStyles(props)
    const { children } = props
    
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

export default DivWithPadding
