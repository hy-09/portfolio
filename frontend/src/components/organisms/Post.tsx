import { makeStyles } from "@material-ui/core"
import { FC } from "react"
import { Post as TypePost } from "../../types/post"
import PaperWithPadding from "../atoms/PaperWithPadding"

const useStyles = makeStyles(theme => ({

}))

type Props = {
    post: TypePost;
    searchWords: Array<string>;
}

const Post: FC<Props> = (props) => {
    const classes = useStyles()
    const { post, searchWords } = props
    
    return (
        <PaperWithPadding>
            {post.content}
        </PaperWithPadding>
    )
}

export default Post
