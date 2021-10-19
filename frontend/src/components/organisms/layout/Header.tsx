import { AppBar, Button, Grid, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const history = useHistory()
    return (
        <AppBar style={{position: 'sticky'}}>
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item>
                        <Button
                            onClick={() => {
                                localStorage.removeItem('localJWT')
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
