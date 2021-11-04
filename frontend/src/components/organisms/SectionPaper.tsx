import { Box, Grid, makeStyles, Paper, Theme, useTheme } from '@material-ui/core'
import { CSSProperties, FC, memo, ReactNode } from 'react'
import DivWithPadding from '../atoms/DivWithPadding'
import PaperWithPadding from '../atoms/PaperWithPadding'
import Title from '../atoms/Title'

type Props = {
    children: ReactNode;
    height?: string;
    backgroundColor?: string;
    className?: string;
    style?: CSSProperties;
    responsivePadding?: boolean;
}

const SectionPaper: FC<Props> = memo((props) => {
    const { children, className, style, height, backgroundColor, responsivePadding } = props

    return (
        <DivWithPadding height={height}>
            <PaperWithPadding 
                className={className} 
                backgroundColor={backgroundColor} 
                height={height}
                style={style}
                responsivePadding={responsivePadding}
            >
                {children}
            </PaperWithPadding>
        </DivWithPadding>
    )
})

export default SectionPaper
