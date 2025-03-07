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
    let newDates = orderedDates.map((w)=>w.date.toLocaleString().split('T')[0])
    //console.log(newDates, newWeights) // neeed to stop this from logging when number input changes?
    const data = {
        labels: newDates,
        datasets: [{ 
        label: 'Tracking My Weight',
        data: newWeights,
        }]
};
        

    return (
        <Line options={options} data={data}/>
    )
}


export default Lineplot