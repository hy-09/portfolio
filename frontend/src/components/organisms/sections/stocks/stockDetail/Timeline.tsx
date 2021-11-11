import { Box, Grid, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useAppSelector } from "../../../../../app/hooks"
import { Company } from "../../../../../types/stock"
import Title from "../../../../atoms/Title"
import Posts from "../../../Posts"
import Section from "../../../Section"

const useStyles = makeStyles(theme => ({

}))

type Props = {
    company: Company;
}

const Timeline: FC<Props> = (props) => {
    const classes = useStyles()
    const { company } = props
    const companyPosts = useAppSelector(state => state.post.posts).filter(post => post.company.id === company.id)
    
    return (
        <Grid item xs={12}>
            <Section title={`${company.name}に関する投稿`}>
                <Posts allPosts={companyPosts} />
            </Section>
        </Grid>
    )
}

export default Timeline
