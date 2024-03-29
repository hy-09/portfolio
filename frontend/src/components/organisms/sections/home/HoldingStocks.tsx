import { Grid } from "@material-ui/core"
import { FC } from "react"
import { useAppSelector } from "../../../../app/hooks"
import HoldingStock from "../../HoldingStock"
import Section from "../../Section"

const HoldingStocks: FC = () => {
    const myStockInfoList = useAppSelector(state => state.stock.myStockInfoList)
    
    return (
        <Grid item xs={12}>
            <Section title="保有銘柄">
                {myStockInfoList.length > 0 ? (
                    <Grid 
                        container
                        spacing={2} 
                    >
                            {myStockInfoList.map(myStockInfo => (
                                <Grid 
                                    item 
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    xl={3}
                                    key={myStockInfo.company.id}
                                >
                                    <HoldingStock myStockInfo={myStockInfo} />
                                </Grid>
                            ))}
                    </Grid>
                ) : (
                    <p>
                        保有している銘柄はございません
                    </p>
                )}
            </Section>
        </Grid>
    )
}

export default HoldingStocks
