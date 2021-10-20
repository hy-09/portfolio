import { AppBar, Button, Grid, makeStyles, Toolbar } from '@material-ui/core'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        position: 'sticky',
        boxShadow: 'none'
    }
}))

const Header: FC = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item>
                        <Button
                            onClick={() => {
                                localStorage.removeItem('localJWT')
                                history.push('/login') 
                                window.location.reload()
                            }}
                        >
                            logout
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
