import { Container, Grid, makeStyles } from "@material-ui/core"
import { FC, ReactNode } from "react"
import Heading from "../../molecules/Heading"

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(0, 2, 4, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 3, 6, 0),
        },
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(0, 6, 6, 3),
        }
    },
}))

type Props = {
    title: string;
    children: ReactNode;
}

const Main: FC<Props> = (props) => {
    const classes = useStyles()
    const { title, children } = props
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="lg" style={{padding: 0}}>
                <Heading title={title} />
                <Grid container>
                    {children}
                </Grid>
            </Container>
        </main>
    )
}

export default Main
