import { Box, Button, Grid, makeStyles, Paper, useTheme } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import DivWithPadding from "../../../atoms/DivWithPadding"
import PaperWithPadding from "../../../atoms/PaperWithPadding"
import NowPrice from "../../../molecules/NowPrice"
import Main from "../../../organisms/layout/Main"
import LineChart from "../../../organisms/LineChart"
import SectionPaper from "../../../organisms/SectionPaper"
import { homeURL } from "../../../../router/HomeRoutes"
import { stockURL } from "../../../../router/StockRoutes"

const useStyles = makeStyles(theme => ({
    nowPrice: {
        order: 1,
        [theme.breakpoints.down('xs')]: {
            order: 1
        }
    },
    buttons: {
        order: 2,
        [theme.breakpoints.down('xs')]: {
            order: 3
        }
    },
    lineChart: {
        order: 3,
        [theme.breakpoints.down('xs')]: {
            order: 2
        }
    },
}))

type Props = {
}

type Params = {
    id: string;
}

const StockDetail: FC<Props> = (props) => {
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
    const { id } = useParams<Params>()
    const companies = useAppSelector(state => state.stock.companies)
    const company = companies.find(company => company.id === parseInt(id))!

    const buttons = (
        <Grid item container spacing={2} >
            <Grid item xs={12} sm={6}>
                <Button 
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    onClick={() => history.push(`${homeURL}${stockURL}`)}
                >
                    銘柄一覧へ戻る
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    size="small" 
                    color="secondary"
                >
                    購入
                </Button>
            </Grid>
        </Grid>
    )
    
    return (
        <Main title={company.name}>
            <Grid item xs={12}>
                <SectionPaper responsivePadding={true}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} className={classes.nowPrice}>
                            <NowPrice company={company} fontSize="1rem" />
                        </Grid>
                        <Grid item container sm={6} className={classes.buttons}>
                            {buttons}
                        </Grid>
                        <Grid item xs={12} className={classes.lineChart}>
                            <LineChart dataList={company.stockPriceDatas} />
                        </Grid>
                    </Grid>
                </SectionPaper>
            </Grid>
        </Main>
    )
}

export default StockDetail
