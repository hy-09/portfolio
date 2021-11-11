import { Box, Button, Container, Grid, makeStyles, Paper, useTheme } from "@material-ui/core"
import { FC } from "react"
import { useParams, useHistory, useRouteMatch } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import { getRoute } from "../../../../functions/router"
import Main from "../../../organisms/layout/Main"
import StockChart from "../../../organisms/sections/stocks/stockDetail/StockChart"
import Timeline from "../../../organisms/sections/stocks/stockDetail/Timeline"


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
    const company = companies.find(company => company.id === Number(id))!

    if (company == undefined || company.id == 0) {
        history.push(getRoute('stocks'))
        window.location.reload()
    }
    
    return (
        <Main title={company.name}>
            <StockChart company={company} />
            <Timeline company={company} />
        </Main>
    )
}

export default StockDetail
