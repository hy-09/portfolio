import { makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../../app/hooks"
import Main from "../../../organisms/layout/Main"

const useStyles = makeStyles(theme => ({

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
            
        </Main>
    )
}

export default StockDetail
