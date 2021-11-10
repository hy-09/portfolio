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

const useStyles = makeStyles(theme => ({
    load: {
        textAlign: 'center',
        margin: theme.spacing(3,0),
        cursor: 'pointer'
    }
}))

const Timeline: FC = memo(() => {
    const classes = useStyles()
    const theme = useTheme()
    const count = 30
    const [shownPostCount, setShownPostCount] = useState(count)
    const allPosts = useAppSelector(state => state.post.posts)
    const [searchWord, setSearchWord] = useState('')
    
    const words = searchWord.replaceAll("　", " ").split(" ").filter(word => word !== '')

    const postsFilteredByWord = allPosts.filter(post => 
        words.every(word => post.content.includes(word))
    )
    const postsFilteredByWordAndNum = postsFilteredByWord.slice(0, shownPostCount)
    const postCount = postsFilteredByWord.length

    return (
        <Main title="タイムライン">
            <DivWithPadding>
                <PaperWithPadding style={{marginBottom: theme.spacing(3)}}>
                    <SearchInput setSearchWord={setSearchWord} />
                </PaperWithPadding>
                <Grid container spacing={2}>
                    {postsFilteredByWordAndNum.map(post => (
                        <Grid item xs={12} sm={6} lg={4} key={post.id}>
                            <Post post={post} searchWords={words} />
                        </Grid>
                    ))}
                    {postsFilteredByWordAndNum.length == 0 && (
                        <Grid item xs={12}>
                            投稿はございません
                        </Grid>
                    )}
                </Grid>
                {shownPostCount < postCount && (
                    <Typography 
                        variant="body1" 
                        color="primary"
                        className={classes.load}
                        onClick={() => setShownPostCount(shownPostCount + count)}
                    >
                        読み込む..
                    </Typography>
                )}
            </DivWithPadding>
        </Main>
    )
})

export default Timeline
