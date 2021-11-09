import { InputBase, makeStyles } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"
import { FC } from "react"

const useStyles = makeStyles(theme => ({
    searchInput: {
        opacity: '0.8',
        padding: `0px ${theme.spacing(1)}`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },
}))

type Props = {
    setSearchWord: (word: string) => void;
}

const SearchInput: FC<Props> = (props) => {
    const classes = useStyles()
    const { setSearchWord } = props
    
    return (
        <InputBase
            placeholder="検索ワード"
            className={classes.searchInput}
            startAdornment={<SearchOutlined fontSize="small" />}
            onChange={e => setSearchWord(e.target.value)}
        />
    )
}

export default SearchInput
