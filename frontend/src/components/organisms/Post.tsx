import { Avatar, Box, Chip, Grid, makeStyles, Theme, Typography, useTheme } from "@material-ui/core"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { getRoute } from "../../functions/router"
import { Post as TypePost } from "../../types/post"
import PaperWithPadding from "../atoms/PaperWithPadding"
import Title from "../atoms/Title"

const useStyles = makeStyles<Theme, Props>(theme => ({
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    companyInfo: {
        padding: theme.spacing(1.5,2,2,2),
        borderRadius: '5px',
        border: props => `1px solid ${props.post.buy_or_sell === 'buy' ? theme.palette.secondary.main : theme.palette.info.main}`,
        backgroundColor: theme.palette.grey[50],
    },
    chip: {
        color: 'white',
        padding: theme.spacing(0.5, 1),
        borderRadius: '9999px',
        fontSize: '0.7rem'
    }
}))

type Props = {
    post: TypePost;
    searchWords: Array<string>;
}

const Post: FC<Props> = (props) => {
    const theme = useTheme()
    const history = useHistory()
    const classes = useStyles(props)
    const { post, searchWords} = props
    const profile = useAppSelector(state => state.auth.profiles).find(profile => profile.user.id === post.user.id)!

    
    let content: string = post.content
    searchWords.forEach(word => {
        content = content.replace(new RegExp(word, 'g'), `<span style="font-weight: bold">${word}</span>`)
    })
    
    return (
        <PaperWithPadding>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar src={profile.img} className={classes.avatar} />
                </Grid>
                <Grid item xs>
                    <div style={{fontWeight: 'bold'}}>{profile.name}</div>
                    <small>{post.created_at}</small>
                </Grid>
            </Grid>
            <div style={{margin: theme.spacing(2.5, 0, 2)}} dangerouslySetInnerHTML={{
                __html: content
            }} />
            <div className={classes.companyInfo}>
                <Box mb={1.5}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <span
                                style={{textDecoration: 'underline', cursor: 'pointer', color: theme.palette.primary.main}}
                                onClick={() => history.push(getRoute('stockDetail', post.company.id))}
                            >
                                {post.company.name}
                            </span>
                        </Grid>
                        <Grid item>
                            {post.buy_or_sell === 'buy' ? (
                                <span className={classes.chip} style={{backgroundColor: theme.palette.secondary.light}}>
                                    現物買
                                </span>
                            ) : (
                                <span className={classes.chip} style={{backgroundColor: theme.palette.info.light}}>
                                    現物売
                                </span>
                            )}
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={1}>
                    <Grid item container alignItems="center" direction="column" xs={6}>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                投稿時点の株価
                            </Typography>
                        </Grid>
                        <Grid item>{post.price.toLocaleString()}円</Grid>
                    </Grid>
                    <Grid item container alignItems="center" direction="column" xs={6}>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                数量
                            </Typography>
                        </Grid>
                        <Grid item>{post.quantity.toLocaleString()}株</Grid>
                    </Grid>
                </Grid>
            </div>
        </PaperWithPadding>
    )
}

export default Post
