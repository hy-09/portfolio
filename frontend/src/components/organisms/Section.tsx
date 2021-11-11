import { Box } from '@material-ui/core'
import { FC, memo, ReactNode } from 'react'
import DivWithPadding from '../atoms/DivWithPadding'

type Props = {
    children: ReactNode;
}

const Section: FC<Props> = memo((props) => {
    const { children } = props

    return (
        <Box mt={4}>
            <DivWithPadding>
                {children}
            </DivWithPadding>
        </Box>
    )
})

export default Section
