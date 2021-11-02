
import { useTheme } from "@material-ui/core"
import { FC } from "react"
import { Line } from 'react-chartjs-2'

type Props = {
    dataList: Array<number>;
}

const LineChart: FC<Props> = (props) => {
    const { dataList } = props
    const theme = useTheme()
    
    const data = {
        labels: Array(dataList.length).fill(''),
        datasets: [
            {
                data: dataList,
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
            },
        ],
    }
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            }
        },
    }
    
    return <Line data={data} options={options} />
}

export default LineChart
