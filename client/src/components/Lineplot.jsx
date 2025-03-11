import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import Card from 'react-bootstrap/Card';
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale,  PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

const Lineplot = (props)=> {
    const options={}
    //order the dates from oldest to newest
    let orderedDates = props.weights.sort((a, b) => new Date(a.date) - new Date(b.date))
    // create arrays to pass to the plot

    let newWeights = orderedDates.map((w)=>w.weight)
    //let newDates = orderedDates.map((w)=>w.date.split('T')[0])
    let newDates = orderedDates.map((w)=> dayjs(w.date).utc().format("MM/DD/YYYY"))
    const data = {
        labels: newDates,
        datasets: [{ 
        label: 'Tracking My Weight',
        data: newWeights,
        }]
};
        

    return (
        <Card body>
            <Line options={options} data={data}/>
        </Card>
    )
}


export default Lineplot