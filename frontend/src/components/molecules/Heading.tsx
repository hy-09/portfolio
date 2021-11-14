import { Divider, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import DivWithPadding from "../atoms/DivWithPadding"

type Props = {
    title: string;
}

const Heading: FC<Props> = (props) => {
    const { title } = props
    const theme = useTheme()
    
    return (
        <DivWithPadding>
            <Typography component="h2" variant="h5">
                {title}
            </Typography>
            <Divider style={{margin: theme.spacing(2, 0)}} />
        </DivWithPadding>
    )
}

export default Heading
