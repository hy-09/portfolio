import { Box, Button, Container, Grid, makeStyles, Paper, useTheme } from "@material-ui/core"
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
import StockChart from "../../../organisms/StockChart"

const useStyles = makeStyles(theme => ({
    
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
    
    return (
        <Main title={company.name}>

            <Grid item xs={12}>
                <Container maxWidth="lg" style={{padding: 0}}>
                    <SectionPaper responsivePadding={true}>
                        <StockChart company={company} />
                    </SectionPaper>
                </Container>
            </Grid>
        </Main>
    )
}

export default StockDetail
