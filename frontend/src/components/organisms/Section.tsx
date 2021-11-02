import { Box, Grid, makeStyles, Paper, Theme } from '@material-ui/core'
import { CSSProperties, FC, memo, ReactNode } from 'react'
import DivWithPadding from '../atoms/DivWithPadding'
import Title from '../atoms/Title'

type Props = {
    children: ReactNode;
    title?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    className?: string;
    style?: CSSProperties;
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    paper: {
        padding: theme.spacing(2),
        height: (props) => props.height ? props.height : 'auto',
        backgroundColor: (props) => props.backgroundColor ? props.backgroundColor : theme.palette.background.paper
    }
}))

const Section: FC<Props> = memo((props) => {
    const classes = useStyles(props)
    const { children, title='', color, className=null, style=undefined, height } = props

    return (
        <DivWithPadding height={height}>
            <Paper className={classes.paper + ' ' + className} style={style}>
                <Title color={color}>{title}</Title>
                {children}
            </Paper>
        </DivWithPadding>
    )
})

export default Section
