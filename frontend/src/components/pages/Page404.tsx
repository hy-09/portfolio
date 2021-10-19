import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Page404 = () => {
    const history = useHistory()
    return (
        <div>
            <p>
                404page
            </p>
            {!!localStorage.localJWT || <Button onClick={() => history.push('/login')}>ログイン画面へ戻る</Button>}
        </div>
    )
}

export default Page404
