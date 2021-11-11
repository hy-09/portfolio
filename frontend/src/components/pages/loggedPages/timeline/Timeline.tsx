import { Box, Grid, makeStyles, Paper, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { FC, memo, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { Post as TypePost } from '../../../../types/post'
import DivWithPadding from '../../../atoms/DivWithPadding'
import PaperWithPadding from '../../../atoms/PaperWithPadding'
import SearchInput from '../../../atoms/SearchInput'
import Main from '../../../organisms/layout/Main'
import Post from '../../../organisms/Post'
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
