import { Box, Grid, makeStyles, Paper, Theme } from '@material-ui/core'
import { FC, memo, ReactNode } from 'react'
import Title from '../atoms/Title'

type Props = {
    children: ReactNode;
    title?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    className?: string;
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
        height: (props) => props.height ? props.height : 'auto',
        backgroundColor: (props) => props.backgroundColor ? props.backgroundColor : theme.palette.background.paper
    }
}))

const Section: FC<Props> = memo((props) => {
    const classes = useStyles(props)
    const { children, title = '', color, className = null } = props

    return (
        <Paper className={classes.paper + ' ' + className}>
            <Title color={color}>{title}</Title>
            {children}
        </Paper>
    )
})

export default Section
