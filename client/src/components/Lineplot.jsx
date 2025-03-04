import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale,  PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { useEffect, useRef } from "react";
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

const Lineplot = (props)=> {
    const options={}
    let newWeights = props.weights.map((w)=>w.weight)
    let newDates = props.weights.map((w)=>w.date.toLocaleString().split('T')[0])
    console.log(newDates, newWeights)
    const data = {
        labels: newDates,
        datasets: [{
            
        label: 'My First Dataset',
        data: newWeights,
        }]
};
        

    return (
        <Line options={options} data={data}/>
    )
}


export default Lineplot