import { Avatar, Box, Button, Checkbox, Chip, Dialog, Grid, IconButton, makeStyles, Theme, Typography, useTheme } from "@material-ui/core"
import { blue, pink } from "@material-ui/core/colors"
import { Favorite, FavoriteBorder, MoreVert, NotListedLocation } from "@material-ui/icons"
import { AvatarGroup } from "@material-ui/lab"
import { registerables } from "chart.js"
import { FC, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getRoute } from "../../functions/router"
import { handleOpenModal } from "../../slices/othersSlice"
import { endLikeProcess, fetchAsyncDeletePost, fetchAsyncPatchPost, startLikeProcess } from "../../slices/postSlice"
import { Post as TypePost } from "../../types/post"
import PaperWithPadding from "../atoms/PaperWithPadding"
import BoughtStockInfo from "../molecules/BoughtStockInfo"
import BoughtStockInfoAndHead from "../molecules/BoughtStockInfoAndHead"
import PostDeleteContent from "../molecules/PostDeleteContent"
import MenuList from "./MenuList"

const useStyles = makeStyles<Theme, Props>(theme => ({
    paper: {
        border: props => `1px solid ${props.post.buy_or_sell === 'buy' ? pink[100] : blue[100]}`,
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    companyInfo: {
        padding: theme.spacing(1.5,2,2,2),
        borderRadius: '5px',
        backgroundColor: props => props.post.buy_or_sell === 'buy' ? 'rgba(233,30,99,0.04)' : 'rgba(33,150,243,0.04)'
    },
    chip: {
        color: 'white',
        padding: theme.spacing(0.5, 1),
        borderRadius: '9999px',
        fontSize: '0.7rem'
    },
    avatarGroup: {
        '& .MuiAvatar-root': {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        '& .MuiAvatar-colorDefault': {
            fontSize: '0.875rem',
        },
    },
    dialogTitleIcon: {
        backgroundColor: pink[100],
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(1.5),
        '&:hover': {
            backgroundColor: pink[200],
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '4rem'
        }
    },
    font08: {
        fontSize: '0.8rem'
    }
}))

type Props = {
    post: TypePost;
    searchWords: Array<string>;
    isDeletable?: boolean;
}

const Post: FC<Props> = (props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const classes = useStyles(props)
    const { post, searchWords, isDeletable=false } = props
    const isLikeProcessing = useAppSelector(state => state.post.isLikeProcessing)
    const loginUser = useAppSelector(state => state.auth.loginUser)
    const profiles = useAppSelector(state => state.auth.profiles)
    const profile = profiles.find(profile => profile.user.id === post.user.id)!
    
    let content: string = post.content
    searchWords.forEach(word => {
        content = content.replace(new RegExp(word, 'g'), `<span style="font-weight: bold">${word}</span>`)
    })

    const handleClickUserName = useCallback(() => {
        if (post.user.id === loginUser.id) {
            return
        }
        history.push(getRoute('userTimeline', post.user.id))
    },[])

    const handleChangeLike = async () => {
        if (isLikeProcessing) {
            return
        }
        
        await dispatch(startLikeProcess())

        let newLikeUsers = []
        if (post.likeUsers.includes(loginUser.id)) {
            newLikeUsers = post.likeUsers.filter(userId => userId !== loginUser.id)

        } else {
            newLikeUsers = [...post.likeUsers, loginUser.id]
        }
        const data = {
            id: post.id,
            likeUsers: newLikeUsers,
        }
        await dispatch(fetchAsyncPatchPost(data))
        dispatch(endLikeProcess())
    }

    const DialogTitle = () => {
        return (
            <>
            <div>
                <IconButton disableRipple className={classes.dialogTitleIcon}>
                    <NotListedLocation />
                </IconButton></div>
            <div>以下の投稿を削除してよろしいですか？</div>
            </>
        )
    }

    const handleClickDelete = () => {
        dispatch(handleOpenModal({
            title: <DialogTitle />, 
            content: <PostDeleteContent id={post.id} content={post.content} />,
            maxWidth: '412px'
        }))
    }
    
    return (
        <PaperWithPadding className={classes.paper}>
            <Grid 
                container 
                spacing={2} 
                alignItems="flex-start"
            >   
                <Grid 
                    item 
                    container
                    spacing={2}
                    style={{cursor: 'pointer', flex: 1}}
                    onClick={handleClickUserName}
                >
                    <Grid item>
                        <Avatar src={profile.img} className={classes.avatar} />
                    </Grid>
                    <Grid item>
                        <div style={{fontWeight: 'bold'}}>{profile.name}</div>
                        <small>{post.created_at}</small>
                    </Grid>
                </Grid>
                {isDeletable && (
                    <Grid item>
                        <MenuList
                            buttonSize="small"
                            ButtonContent={() => (
                                <MoreVert color="action" />
                            )}
                            items={[<span onClick={handleClickDelete}>削除</span>]}
                        />
                    </Grid>
                )}
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
                {post.buy_or_sell === 'buy' ? (
                    <Grid container spacing={1}>
                        <Grid item container alignItems="center" direction="column" xs={6}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    投稿時点の株価
                                </Typography>
                            </Grid>
                            <Grid item className={classes.font08}>{post.price.toLocaleString()}</Grid>
                        </Grid>
                        <Grid item container alignItems="center" direction="column" xs={6}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    数量
                                </Typography>
                            </Grid>
                            <Grid item className={classes.font08}>{post.quantity.toLocaleString()}株</Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <BoughtStockInfoAndHead isFixedPL={true}>
                        <BoughtStockInfo
                            price={post.price}
                            quantity={post.quantity}
                            profitOrLossPrice={post.profit_or_loss_price!}
                        />
                    </BoughtStockInfoAndHead>
                )}
            </div>
            <Box mt={1.5}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Checkbox
                            icon={<FavoriteBorder color="action" />}
                            checkedIcon={<Favorite color="secondary" />}
                            checked={post.likeUsers.some(userId => userId === loginUser.id)}
                            onChange={handleChangeLike}
                        />
                    </Grid>
                    <Grid item>
                        <AvatarGroup max={7} className={classes.avatarGroup}>
                            {post.likeUsers.map(userId => (
                                <Avatar
                                    key={userId}
                                    src={profiles.find(profile => profile.user.id === userId)!.img} 
                                />
                            ))}
                        </AvatarGroup>
                    </Grid>
                </Grid>
            </Box>
        </PaperWithPadding>
    )
}

export default Post
