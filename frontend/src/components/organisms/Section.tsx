import { Box } from '@material-ui/core'
import { FC, memo, ReactNode } from 'react'
import DivWithPadding from '../atoms/DivWithPadding'
import Title from '../atoms/Title'

type Props = {
    children: ReactNode;
    title: string;
}

const Section: FC<Props> = memo((props) => {
    const { children, title } = props

    return (
        <Box mt={4}>
            <DivWithPadding>
                <Box pb={0.5}>
                    <Title>{title}</Title>
                </Box>
                {children}
            </DivWithPadding>
        </Box>
    )
})

export default Section
