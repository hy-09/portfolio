import { Container, Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { Company } from "../../../../../types/stock"
import SectionPaper from "../../../SectionPaper"
import StockChart from "../../../StockChart"

type Props = {
    company: Company;
}

const StockChartSection: FC<Props> = (props) => {
    const { company } = props
    return (
        <Grid item xs={12}>
            <SectionPaper responsivePadding={true}>
                <StockChart company={company} />
            </SectionPaper>
        </Grid>
    )
}

export default StockChartSection
