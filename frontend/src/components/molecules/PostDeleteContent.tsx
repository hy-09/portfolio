import { Button, DialogActions, DialogContent, DialogContentText, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleCloseModal, handleOpenNotifyAndBackdrop } from "../../slices/othersSlice"
import { fetchAsyncDeletePost } from "../../slices/postSlice"

const useStyles = makeStyles(theme => ({
    content: {
        marginBottom: theme.spacing(3),
        color: theme.palette.text.secondary
    },
    buttons: {
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}))

type Props = {
    id: number,
    content: string
}

const PostDeleteContent: FC<Props> = (props) => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    
    const { id, content } = props

    const handleClose = () => {
        dispatch(handleCloseModal())
    }

    const onConfirm = async () => {
        await dispatch(fetchAsyncDeletePost(id))
        dispatch(handleOpenNotifyAndBackdrop({
            message: '投稿を削除しました',
            type: 'success'
        }));
        (handleClose as Function)()
    }
    
    return (
        <>
            <div 
                className={classes.content} 
                id="alert-dialog-description"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className={classes.buttons}>
                <Button onClick={handleClose} color="default">
                    キャンセル
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>
                    削除
                </Button>
            </div>
        </>
    )
}

export default PostDeleteContent
