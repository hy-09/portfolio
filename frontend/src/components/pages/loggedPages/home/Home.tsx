
import { FC, memo } from 'react'
import Main from '../../../organisms/layout/Main'
import HoldingStocks from '../../../organisms/sections/home/HoldingStocks'
import Timeline from '../../../organisms/sections/home/Timeline'
import PriceStatuses from '../../../organisms/sections/home/PriceStatuses'

const Home: FC = memo(() => {
    return (
        <Main title="ホーム" >
            <PriceStatuses />
            <HoldingStocks />
            <Timeline />
        </Main>
    )
})

export default Home
