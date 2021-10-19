import { Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Page404 = () => {
    const history = useHistory()
    return (
        <Box m={!!localStorage.localJWT ? 0 : 2}>
            <p>
                404page
            </p>
            {!!localStorage.localJWT || <Button onClick={() => history.push('/login')}>ログイン画面へ戻る</Button>}
        </Box>
    )
}

export default Page404
