import { Grid, makeStyles, Paper } from "@material-ui/core"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import DivWithPadding from "../../../atoms/DivWithPadding"
import PaperWithPadding from "../../../atoms/PaperWithPadding"
import Main from "../../../organisms/layout/Main"
import LineChart from "../../../organisms/LineChart"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
}))

type Props = {

}

type Params = {
    id: string;
}

const StockDetail: FC<Props> = (props) => {
    const classes = useStyles()
    const { id } = useParams<Params>()
    const companies = useAppSelector(state => state.stock.companies)
    const company = companies.find(company => company.id === parseInt(id))!
    
    return (
        <Main title={company.name}>
            <DivWithPadding>
                <Grid item xs={12}>
                    <PaperWithPadding>
                        <LineChart dataList={company.stockPriceDatas} />
                    </PaperWithPadding>
                </Grid>
            </DivWithPadding>
        </Main>
    )
}

export default StockDetail
