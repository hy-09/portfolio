import { makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, ReactNode } from 'react'

const useStyles = makeStyles<Theme, Props>(theme => ({
    root: {
        color: (props) => props.color ? props.color : 'textPrimary'
    }
}))


type Props = {
    children: ReactNode;
    color?: string;
}

const Title: FC<Props> = (props) => {
    const { children } = props
    const classes = useStyles(props)

    return (
        <Typography component="h2" variant="h6" gutterBottom className={classes.root} >
            {children}
        </Typography>
    )
}

export default Title
