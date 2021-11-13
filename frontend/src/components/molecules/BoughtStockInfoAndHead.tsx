import { Grid, useTheme } from "@material-ui/core"
import { FC, ReactNode } from "react"
import { grey } from "@material-ui/core/colors"

type Props = {
    children: ReactNode;
    isFixedPL?: boolean;
}

const BoughtStockInfoAndHead: FC<Props> = (props) => {
    const theme = useTheme()
    const { children, isFixedPL=false } = props
    
    return (
        <div>
            <Grid container justifyContent="space-around" style={{color: grey[600], marginBottom: theme.spacing(1.2)}}>
                <Grid item>
                    取得単価（株数）
                </Grid>
                <Grid item>
                    {isFixedPL ? '損益額' : '評価損益額'}
                </Grid>
            </Grid>
            {children}
        </div>
    )
}

export default BoughtStockInfoAndHead
