
import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import DivWithPadding from '../../../atoms/DivWithPadding'
import Main from '../../../organisms/layout/Main'
import Posts from '../../../organisms/Posts'

type Params = {
    id: string;
}

const UserTimeline: FC = memo(() => {
    const { id } = useParams<Params>()
    const userPosts = useAppSelector(state => state.post.posts).filter(post => post.user.id === Number(id))

    return (
        <Main title="タイムライン" showBackButton={true}>
            <DivWithPadding>
                <Posts allPosts={userPosts} />
            </DivWithPadding>
        </Main>
    )
})

export default UserTimeline
