import { Grid } from "@material-ui/core"
import { FC } from "react"
import SmallButton from "../atoms/SmallButton"

type Props = {
    button1Label: string;
    button2Label: string;
    button2Color: "inherit" | "default" | "primary" | "secondary" | undefined;
    onClickButton1: () => void;
    onClickButton2: () => void;
}

const TwoButtons: FC<Props> = (props) => {
    const { button1Label, button2Label, button2Color, onClickButton1, onClickButton2 } = props
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <SmallButton
                    variant="outlined"
                    onClick={onClickButton1}
                    label={button1Label}
                >
                    ホームに戻る
                </SmallButton>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SmallButton 
                    variant="contained" 
                    color={button2Color}
                    onClick={onClickButton2}
                    label={button2Label}
                >
                    この注文のコメントを残す
                </SmallButton>
            </Grid>
        </Grid>
    )
}

export default TwoButtons
