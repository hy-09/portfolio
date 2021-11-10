import { Grid } from "@material-ui/core"
import { FC } from "react"
import SmallButton from "../atoms/SmallButton"

type Props = {
    button1Label: string;
    button2Label: string;
    button2Color: "inherit" | "default" | "primary" | "secondary" | undefined;
    button2Variant?: "contained" | "text" | "outlined" | undefined;
    onClickButton1: () => void;
    onClickButton2: () => void;
}

const TwoButtons: FC<Props> = (props) => {
    const { button1Label, button2Label, button2Color, button2Variant="contained", onClickButton1, onClickButton2 } = props
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <SmallButton
                    variant="outlined"
                    onClick={onClickButton1}
                    label={button1Label}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SmallButton 
                    variant={button2Variant} 
                    color={button2Color}
                    onClick={onClickButton2}
                    label={button2Label}
                />
            </Grid>
        </Grid>
    )
}

export default TwoButtons
