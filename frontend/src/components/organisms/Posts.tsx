import { Grid, makeStyles, Typography } from "@material-ui/core"
import { FC, useState } from "react"
import { Post as TypePost } from "../../types/post"
import Post from "./Post"

const useStyles = makeStyles(theme => ({
    load: {
        textAlign: 'center',
        margin: theme.spacing(3,0),
        cursor: 'pointer'
    }
}))

type Props = {
    allPosts: Array<TypePost>;
    searchWord?: string;
}

const Posts: FC<Props> = (props) => {
    const classes = useStyles()
    const { allPosts, searchWord='' } = props
    const count = 30
    const [shownPostCount, setShownPostCount] = useState(count)
    
    const words = searchWord.replaceAll("　", " ").split(" ").filter(word => word !== '')

    const postsFilteredByWord = allPosts.filter(post => 
        words.every(word => post.content.includes(word))
    )
    const postsFilteredByWordAndNum = postsFilteredByWord.slice(0, shownPostCount)
    const postCount = postsFilteredByWord.length
    
    return (
        <>
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
        </>
    )
}

export default Posts
