import { Box, Button, Grid, Hidden, makeStyles, useTheme } from '@material-ui/core'
import { FC, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import { getRoute } from '../../../../functions/router'
import DivWithPadding from '../../../atoms/DivWithPadding'
import PaperWithPadding from '../../../atoms/PaperWithPadding'
import Title from '../../../atoms/Title'
import NowPrice from '../../../molecules/NowPrice'
import Main from '../../../organisms/layout/Main'
import LineChart from '../../../organisms/LineChart'

const useStyles = makeStyles(theme => ({
    detailButton: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2)
        },
    },
}))

const Stocks: FC = memo(() => {
    const classes = useStyles()
    const theme = useTheme()
    const companies = useAppSelector(state => state.stock.companies)
    const history = useHistory()

    return (
        <Main title="銘柄一覧">
            <DivWithPadding>
                <Grid container spacing={2}>
                    {companies.map(company => (
                        <Grid 
                            item 
                            xs={12}
                            sm={6}
                            lg={4}
                            xl={3}
                            key={company.id}
                        >
                            <PaperWithPadding>
                                <Title component="h4" variant="subtitle1" color={theme.palette.primary.main} >
                                    {company.name}
                                </Title>
                                <NowPrice company={company} />
                                <Hidden xsDown>
                                    <Box mt={0.5}>
                                        <LineChart dataList={company.stockPriceDatas.slice(-20)} />
                                    </Box>
                                </Hidden>
                                <Button 
                                    size="small" 
                                    variant="outlined" 
                                    fullWidth 
                                    color="secondary"
                                    className={classes.detailButton}
                                    onClick={() => history.push(getRoute('stockDetail', company.id))}
                                >
                                    詳細
                                </Button>
                            </PaperWithPadding>
                        </Grid>
                    ))}
                </Grid>
            </DivWithPadding>
        </Main>
    )
})

export default Stocks
