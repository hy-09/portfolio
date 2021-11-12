import { IconButton, InputBase, makeStyles, useTheme } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"
import { FC, useState } from "react"

const useStyles = makeStyles(theme => ({
    searchInput: {
        opacity: '0.8',
        padding: `0px ${theme.spacing(1)}`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& input': {
            padding: theme.spacing(1)
        }
    },
}))

type Props = {
    setSearchWord: (word: string) => void;
}

const SearchInput: FC<Props> = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const { setSearchWord } = props
    const [tmpSearchWord, settmpSearchWord] = useState('')

    const handleClickSearchIcon = () => {
        setSearchWord(tmpSearchWord)
    }
    
    return (
        <>
        <IconButton size="small" onClick={handleClickSearchIcon}>
            <SearchOutlined fontSize="small" />
        </IconButton>
        <InputBase
            placeholder="検索ワード"
            className={classes.searchInput}
            onChange={e => settmpSearchWord(e.target.value)}
        />
        </>
    )
}

export default SearchInput
