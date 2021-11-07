import { Box, Button, ButtonGroup, FormControl, FormControlLabel, Grid, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme, Typography, useTheme } from "@material-ui/core"
import { cyan } from "@material-ui/core/colors"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { Company } from "../../../types/stock"
import Title from "../../atoms/Title"

const useStyles = makeStyles<Theme, Props>(theme => ({
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
    format: 'buy' | 'sell';
    totalQuantity?: number;
    setNewQuantity: (num: number) => void;
    setStep: (num: number) => void;
    setNewFund: (fund: number) => void;
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
        format,
        fund,
        totalQuantity,
        setNewQuantity,
        setStep,
        setNewFund,
        setTotalPrice,
        setQuantity,
        setChangeRate,
    } = props

    const classes = useStyles(props)
    const history = useHistory()
    const theme = useTheme()

    const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number((event.target as HTMLInputElement).value)

        if (value == 0) {
            let newQuantity = 100

            if (format === 'buy') {
                while(nowPrice * newQuantity < fund) {
                    newQuantity += 100
                }
                newQuantity -= 100

            } else {
                newQuantity = totalQuantity!
            }

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

        if (format === 'buy') {
            if (newQuantity < 100 || newQuantity * nowPrice > fund) {
                return
            }
            
        } else {
            if (newQuantity < 100 || newQuantity > totalQuantity!) {
                return
            }
        }

        setParams(newQuantity)
    }

    const setParams = (newQuantity: number) => {
        setQuantity(newQuantity)
        const newTotalPrice = nowPrice * newQuantity
        setTotalPrice(newTotalPrice)
        setNewFund(fund - newTotalPrice)

        if (format === 'sell') {
            setNewQuantity(totalQuantity! - newQuantity)
        }
    }
    
    return (
        <>
        <Box mb={4}>
            <Title center={true}>数量の選択</Title>
            {/* {color}{format} */}
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography component="h3" variant="h6" style={{color: cyan[700]}} >
                    {company.name}
                </Typography>
            </Grid>
            <Grid item>
                <span style={{fontSize: '0.875rem'}}>現在値：{nowPrice.toLocaleString()}</span>
            </Grid>
        </Grid>
        <p style={{textAlign: 'right'}}>
            {format === 'buy' ? (
                `(資金：${fund.toLocaleString()}円)`
            ) : (
                `(保有株数：${totalQuantity!.toLocaleString()}株)`
            )}
        </p>
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
                    <ButtonGroup color={format === 'buy' ? 'secondary' : 'primary'} style={{marginLeft: theme.spacing(1)}}>
                        <Button onClick={() => handleClickPlusOrMinus('+')}>+</Button>
                        <Button onClick={() => handleClickPlusOrMinus('-')}>-</Button>
                    </ButtonGroup>
                )}
            </Box>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup value={String(changeRate)} onChange={handleChangeRate} className={classes.radioGroup}>
                    <FormControlLabel value="100" control={<Radio color={format === 'buy' ? 'secondary' : 'primary'} />} label="100ずつ" />
                    <FormControlLabel value="500" control={<Radio color={format === 'buy' ? 'secondary' : 'primary'} />} label="500ずつ" />
                    <FormControlLabel value="0" control={<Radio color={format === 'buy' ? 'secondary' : 'primary'} />} label={format === 'buy' ? "買えるだけ" : 'すべて'} />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box mb={4}>
            <Typography component="div" variant="h6" style={{textAlign: 'right', fontWeight: 'bold'}}>
                合計金額：{(totalPrice).toLocaleString()}円
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
                    color={format === 'buy' ? 'secondary' : 'primary'}
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
