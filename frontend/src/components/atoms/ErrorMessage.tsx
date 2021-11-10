import { Box, makeStyles, Typography } from "@material-ui/core"
import { FC } from "react"

const useStyles = makeStyles(theme => ({

}))

type Props = {
    show: boolean;
    message: string;
}

const ErrorMessage: FC<Props> = (props) => {
    const classes = useStyles()
    const { show, message } = props
    
    return (
        <>
        {show && (
            <Box my={1}>
                <Typography variant="body2" color="error">{message}</Typography>
            </Box>
        )}
        </>
    )
}

export default ErrorMessage
