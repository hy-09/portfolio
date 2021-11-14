
import { FC, memo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import { getRoute } from '../../../../functions/router'
import DivWithPadding from '../../../atoms/DivWithPadding'
import Main from '../../../organisms/layout/Main'
import Posts from '../../../organisms/Posts'

type Params = {
    id: string;
}

const UserTimeline: FC = memo(() => {
    const { id } = useParams<Params>()
    const history = useHistory()
    const profile = useAppSelector(state => state.auth.profiles).find(profile => profile.user.id === Number(id))
    const userPosts = useAppSelector(state => state.post.posts).filter(post => post.user.id === Number(id))

    if (!profile) {
        history.push(getRoute('timeline'))
        window.location.reload()
    }
    return (
        <Main title={`${profile!.name}さんの投稿`} showBackButton={true}>
            <DivWithPadding>
                <Posts allPosts={userPosts} />
            </DivWithPadding>
        </Main>
    )
})

export default UserTimeline
