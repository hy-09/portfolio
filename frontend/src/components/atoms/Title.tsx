import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import { ElementType, FC, ReactNode } from 'react'

const useStyles = makeStyles<Theme, Props>(theme => ({
    root: {
        color: (props) => props.color ? props.color : 'textPrimary',
        textAlign: (props) => props.center ? 'center' : 'left'
    }
}))


type Props = {
    children: ReactNode;
    color?: string;
    component?: ElementType<any>;
    variant?: Variant;
    gutterBottom?: boolean;
    center?: boolean;
    className?: string;
}

const Title: FC<Props> = (props) => {
    const { children, component='h3', variant='h6', gutterBottom=true, className } = props
    const classes = useStyles(props)

    return (
        <Typography 
            component={component} variant={variant} gutterBottom={gutterBottom} className={classes.root + ' ' + className} >
            {children}
        </Typography>
    )
}

export default Title
