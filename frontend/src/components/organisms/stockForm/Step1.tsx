import { Box, Button, ButtonGroup, FormControl, FormControlLabel, Grid, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { Company } from "../../../types/stock"
import Title from "../../atoms/Title"

const useStyles = makeStyles(theme => ({
    quantity: {
        width: 'calc(100% - 87px)',
        '& input': {
            textAlign: 'right',
            fontWeight: 'bold',
            width: 'calc(100% - 44px)',
        }
    },
    radioGroup: {
        flexDirection: 'row',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            '& .MuiRadio-root': {
                padding: theme.spacing(0.2)
            }
        }
    },
}))

type Props = {
    company: Company;
    nowPrice: number;
    quantity: number;
    changeRate: number;
    totalPrice: number;
    fund: number;
    setStep: (num: number) => void;
    setRemainingFund: (fund: number) => void;
    setTotalPrice: (price: number) => void;
    setQuantity: (quantity: number) => void;
    setChangeRate: (rate: number) => void;
}

const Step1: FC<Props> = (props) => {
    const {
        company,
        nowPrice,
        quantity,
        changeRate,
        totalPrice,
        fund,
        setStep,
        setRemainingFund,
        setTotalPrice,
        setQuantity,
        setChangeRate,
    } = props

    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()

    const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number((event.target as HTMLInputElement).value)

        if (value == 0) {
            let newQuantity = 100

            while(nowPrice * newQuantity < fund) {
                newQuantity += 100
            }
            newQuantity -= 100
            setParams(newQuantity)
        }
        setChangeRate(value)
    }

    const handleClickPlusOrMinus = (code: '+' | '-') => {
        let newQuantity: number

        if (code === '+') {
            newQuantity = quantity + changeRate
        } else {
            newQuantity = quantity - changeRate
        }

        if (newQuantity < 100 || newQuantity * nowPrice > fund) {
            return
        }

        setParams(newQuantity)
    }

    const setParams = (newQuantity: number) => {
        setQuantity(newQuantity)
        const newTotalPrice = nowPrice * newQuantity
        setTotalPrice(newTotalPrice)
        setRemainingFund(fund - newTotalPrice)
    }
    
    return (
        <>
        <Box mb={4}>
            <Title center={true}>数量の選択</Title>
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography component="h3" variant="h6" color="primary" >
                    {company.name}
                </Typography>
            </Grid>
            <Grid item>
                <span style={{fontSize: '0.875rem'}}>現在値：{nowPrice.toLocaleString()}</span>
            </Grid>
        </Grid>
        <Box my={4}>
            <Box mb={1}>
                <TextField
                    value={quantity}
                    InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment position="end">株</InputAdornment>
                    }}
                    className={classes.quantity}
                />
                {changeRate != 0 && (
                    <ButtonGroup color="secondary" style={{marginLeft: theme.spacing(1)}}>
                        <Button onClick={() => handleClickPlusOrMinus('+')}>+</Button>
                        <Button onClick={() => handleClickPlusOrMinus('-')}>-</Button>
                    </ButtonGroup>
                )}
            </Box>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup value={String(changeRate)} onChange={handleChangeRate} className={classes.radioGroup}>
                    <FormControlLabel value="100" control={<Radio />} label="100ずつ" />
                    <FormControlLabel value="500" control={<Radio />} label="500ずつ" />
                    <FormControlLabel value="0" control={<Radio />} label="買えるだけ" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box mb={4}>
            <Typography component="div" variant="h6" style={{textAlign: 'right', fontWeight: 'bold'}}>
                合計金額：{(totalPrice).toLocaleString()}円
            </Typography>
            <Typography style={{textAlign: 'right'}}>
                (資金：{fund.toLocaleString()}円)
            </Typography>
        </Box>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button 
                    variant="outlined" 
                    fullWidth 
                    size="small"
                    onClick={() => history.goBack()}
                >
                    戻る
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button 
                    variant="contained" 
                    fullWidth size="small" 
                    color="secondary"
                    onClick={() => setStep(2)}
                >
                    確認する
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Step1
