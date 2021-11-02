import { Box, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { FC, memo, useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import Section from '../../organisms/Section'

const useStyles = makeStyles(theme => ({
    
}))

const Stocks: FC = memo(() => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Grid item xs={12}>
            <Section title="銘柄一覧">
                <br />
                stock
            </Section>
        </Grid>
    )
})

export default Stocks
