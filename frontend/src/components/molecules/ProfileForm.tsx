import { Avatar, Button, makeStyles, TextField } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { editName, fetchAsyncUpdateProf, fetchCredEnd, fetchCredStart, resetOpenProfile } from '../../slices/authSlice'
import { handleModalClose, handleNotifyOpen } from '../../slices/componentSlice'
import { Notify } from '../../types/component'
import { File } from '../../types/user'


const useStyles = makeStyles(theme => ({
    fileInput: {
        opacity: 0,
        appearance: 'none',
        position: 'absolute',    
    },
    imageGroup: {
        margin: theme.spacing(3, 0, 4),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}))

const ProfileForm: FC = () => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const myprofile = useAppSelector(state => state.auth.myprofile)
    const [image, setImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleSetPreviewImage = (img: File) => {
        setImage(img)

        const imgURL = URL.createObjectURL(img)
        setPreviewImage(imgURL)
    }
    
    const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const profile = {
            id: myprofile.id,
            name: myprofile.name,
            img: image,
        }

        await dispatch(fetchCredStart())
        await dispatch(fetchAsyncUpdateProf(profile))
        await dispatch(fetchCredEnd())
        dispatch(handleModalClose())
        dispatch(handleNotifyOpen({
            message: 'プロフィールを変更しました',
            type: 'success'
        }))
    }

    return (
        <form>
            <div>
                <TextField 
                    label="ユーザー名"
                    type="text"
                    value={myprofile?.name}
                    onChange={e => dispatch(editName(e.target.value))}
                />
            </div>
            <div className={classes.imageGroup}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                >
                    画像を選択
                    <input
                        type="file"
                        accept="image/*"
                        className={classes.fileInput}
                        onChange={(e) => handleSetPreviewImage(e.target.files![0])}
                    />
                </Button>
                <Avatar src={previewImage ? previewImage : myprofile.img} className={classes.avatar} />

            </div>
            <Button
                disabled={!myprofile?.name}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                onClick={updateProfile}
            >
                保存
            </Button>
        </form>
    )
}

export default ProfileForm
