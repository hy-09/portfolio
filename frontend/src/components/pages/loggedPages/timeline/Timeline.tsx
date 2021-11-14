
import { FC, memo } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import DivWithPadding from '../../../atoms/DivWithPadding'
import Main from '../../../organisms/layout/Main'
import Posts from '../../../organisms/Posts'

const Timeline: FC = memo(() => {
    const allPosts = useAppSelector(state => state.post.posts)

    return (
        <Main title="タイムライン">
            <DivWithPadding>
                <Posts allPosts={allPosts} />
            </DivWithPadding>
        </Main>
    )
})

export default Timeline
