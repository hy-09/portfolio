import { Avatar, Button, makeStyles, TextField } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { editName, fetchAsyncUpdateProf, fetchCredEnd, fetchCredStart, resetOpenProfile } from '../../slices/authSlice'
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
    const profile = useAppSelector(state => state.auth.myprofile)
    const [image, setImage] = useState<File | null>(null)

    const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const data = {
            id: profile.id,
            name: profile.name,
            img: image,
        }

        await dispatch(fetchCredStart())
        await dispatch(fetchAsyncUpdateProf(data))
        await dispatch(fetchCredEnd())
    }

    return (
        <form>
            <div>
                <TextField 
                    label="ユーザー名"
                    type="text"
                    value={profile?.name}
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
                        className={classes.fileInput}
                        onChange={e => setImage(e.target.files![0])}
                    />
                </Button>
                <Avatar alt="アバター" src="https://picsum.photos/200" className={classes.avatar} />
            </div>
            <Button
                disabled={!profile?.name}
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
