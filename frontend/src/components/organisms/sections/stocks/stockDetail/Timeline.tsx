import { Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import Title from "../../../../atoms/Title"
import Section from "../../../Section"

const useStyles = makeStyles(theme => ({

}))

type Props = {

}

const Timeline: FC<Props> = (props) => {
    const classes = useStyles()
    
    return (
        <Grid item xs={12}>
            <Section>
                <Title>
                    
                </Title>
            </Section>
        </Grid>
    )
}

export default Timeline
