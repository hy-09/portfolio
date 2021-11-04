import { makeStyles, Paper } from "@material-ui/core"
import { FC, ReactNode } from "react"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
}))

type Props = {
    children: ReactNode;
}

const PaperWithPadding: FC<Props> = (props) => {
    const classes = useStyles()
    const { children } = props
    
    return (
        <Paper className={classes.paper}>
            {children}
        </Paper>
    )
}

export default PaperWithPadding
