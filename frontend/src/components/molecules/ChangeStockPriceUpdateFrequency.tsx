import { Avatar, Button, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import React, { FC, useState } from 'react'
import SmallButton from '../atoms/SmallButton'


const useStyles = makeStyles(theme => ({
    textField: {
        width: '100%',
        marginBottom: theme.spacing(4),
        '& input': {
            textAlign: 'right',
            width: '100%',
        }
    }
}))

const ChangeStockPriceUpdateFrequency: FC = () => {
    const classes = useStyles()
    const nowFrequency = Number(localStorage.stockPriceUpdateFrequency) / 1000
    const [seconds, setSeconds] = useState(String(nowFrequency))

    const setFrequency = () => {
        localStorage.stockPriceUpdateFrequency = String(Number(seconds) * 1000)
        window.location.reload()
    }

    return (
        <>
            <TextField 
                type="number"
                value={seconds}
                className={classes.textField}
                InputProps={{
                    endAdornment: <InputAdornment position="end">秒</InputAdornment>
                }}
                onChange={e => {
                    setSeconds(e.target.value)
                }}
            />
            <SmallButton
                disabled={Number(seconds) <= 0}
                variant="contained"
                color="primary"
                onClick={setFrequency}
                label="保存"
            />
        </>
    )
}

export default ChangeStockPriceUpdateFrequency
