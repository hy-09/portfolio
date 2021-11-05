import { Box, Button, ButtonGroup, Container, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useTheme } from "@material-ui/core"
import { FC, useCallback, useState } from "react"
import { useHistory, useParams, useLocation } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import { getRoute } from "../../../../functions/router"
import Title from "../../../atoms/Title"
import Main from "../../../organisms/layout/Main"
import SectionPaper from "../../../organisms/SectionPaper"

const useStyles = makeStyles(theme => ({
    quantity: {
        width: 'calc(100% - 87px)',
        '& input': {
            textAlign: 'right',
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
    }
}))

type Props = {

}

type Params = {
    id: string;
}

const BuyStockForm: FC<Props> = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
    const { id } = useParams<Params>()
    const { state } = useLocation<number>()
    const nowPrice: number = state
    const companies = useAppSelector(state => state.stock.companies)
    const company = companies.find(company => company.id === Number(id))!
    const fund = useAppSelector(state => state.auth.loginUser.fund)
    const [quantity, setQuantity] = useState(100)
    const [changeRate, setChangeRate] = useState(100)
    const [step, setStep] = useState(1)
    
    if (company == undefined || company.id == 0) {
        history.push(getRoute('stocks'))
        window.location.reload()
    }

    const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number((event.target as HTMLInputElement).value)

        if (value == 0) {
            let newQuantity = 100

            while(nowPrice * newQuantity < fund) {
                newQuantity += 100
            }
            setQuantity(newQuantity - 100)
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

        setQuantity(newQuantity)
    }

    return (
        <Main title='購入フォーム'>
            <Grid item xs={12}>
                <Container maxWidth="sm" style={{padding: 0}}>
                    <SectionPaper responsivePadding={true}>
                        {step === 1 && (
                            <>
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
                                <Typography component="div" variant="h6" style={{textAlign: 'right'}}>
                                    合計金額：{(nowPrice * quantity).toLocaleString()}円
                                </Typography>
                                <Typography style={{textAlign: 'right'}}>
                                    （資金：{fund.toLocaleString()}円）
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
                        )}
                        {step === 2 && (
                            <>
                            <Title center={true}>注文内容の確認</Title>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        size="small"
                                        onClick={() => setStep(1)}
                                    >
                                        戻る
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth size="small" 
                                        color="secondary"
                                        onClick={() => setStep(3)}
                                    >
                                        購入
                                    </Button>
                                </Grid>
                            </Grid>
                            </>
                        )}
                        {step === 3 && (
                            <></>
                        )}
                    </SectionPaper>
                </Container>
            </Grid>
        </Main>
    )
}

export default BuyStockForm
