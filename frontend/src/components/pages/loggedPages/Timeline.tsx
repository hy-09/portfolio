import { Box, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'

const useStyles = makeStyles(theme => ({
    
}))

const Timeline: FC = () => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div>
            timeline
        </div>
    )
}

export default Timeline
