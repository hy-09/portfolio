import { useTheme } from "@material-ui/core"
import { FC } from "react"
import { Company } from "../../types/stock"
import ChangeRate from "../atoms/ChangeRate"

type Props = {
    company: Company;
    fontSize?: string;
    showChangeRate?: boolean;
}

const NowPrice: FC<Props> = (props) => {
    const { company, fontSize='0.8rem', showChangeRate=true } = props
    const theme = useTheme()
    
    return (
        <div>
            <span style={{marginRight: theme.spacing(0.7), fontSize: fontSize}}>
                現在値：{company.nowPrice.toLocaleString()}
            </span>
            {showChangeRate && (
                <ChangeRate
                    rate={company.StockPriceChangeRate}
                    fontSize={fontSize}
                />
            )}
        </div>
    )
}

export default NowPrice
