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
    const { post, searchWords} = props
    
    let content: string = post.content
    searchWords.forEach(word => {
        content = content.replace(new RegExp(word, 'g'), `<span style="font-weight: bold">${word}</span>`)
    })
    
    return (
        <PaperWithPadding>
            <div className="content" dangerouslySetInnerHTML={{
                __html: content
            }} />
        </PaperWithPadding>
    )
}

export default Post
