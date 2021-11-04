import { Box, Grid, makeStyles, Paper, Theme } from '@material-ui/core'
import { CSSProperties, FC, memo, ReactNode } from 'react'
import DivWithPadding from '../atoms/DivWithPadding'
import Title from '../atoms/Title'

type Props = {
    children: ReactNode;
    height?: string;
    backgroundColor?: string;
    className?: string;
    style?: CSSProperties;
    responsivePadding?: boolean;
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: props => props.responsivePadding ? theme.spacing(3) : theme.spacing(2),
        },
        height: (props) => props.height ? props.height : 'auto',
        backgroundColor: (props) => props.backgroundColor ? props.backgroundColor : theme.palette.background.paper
    }
}))

const PaperWithPadding: FC<Props> = memo((props) => {
    const classes = useStyles(props)
    const { children, className=null, style=undefined } = props

    return (
        <Paper className={classes.paper + ' ' + className} style={style}>
            {children}
        </Paper>
    )
})

export default PaperWithPadding
