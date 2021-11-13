import { Container, Grid, IconButton, makeStyles } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import { FC, ReactNode } from "react"
import BackButton from "../../atoms/BackButton"
import ToTopButton from "../../atoms/ToTopButton"
import Heading from "../../molecules/Heading"

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    main: {
        flexGrow: 1,
        overflow: 'auto',
        padding: theme.spacing(0, 2, 4, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 3, 6, 0),
        },
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(0, 6, 6, 3),
        }
    },
    container: {
        padding: 0, 
    }
}))

type Props = {
    title: string;
    children: ReactNode;
    showBackButton?: boolean;
}

const Main: FC<Props> = (props) => {
    const classes = useStyles()
    const { title, children, showBackButton } = props
    
    return (
        <main className={classes.main}>
            <div className={classes.toolbar} />
            <Container maxWidth="lg" className={classes.container}>
                <Heading title={title} />
                <Grid container>
                    {children}
                </Grid>
            </Container>
            <BackButton show={showBackButton} />
            <ToTopButton />
        </main>
    )
}

export default Main
