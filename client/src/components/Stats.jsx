import { useState, useEffect } from "react"
export default function Stats({user, weights}){
    const [initialWeight, setInitialWeight]= useState(null)
    const [lowestWeight, setLowestWeight]= useState(null)
    const [recentWeight, setRecentWeight] = useState(null)
    const [totalWeightLost, setTotalWeightLost] = useState(null)

    const getLowest = (weights) => {
        if (weights.length > 0) return Math.min(...weights.map(w=>w.weight));
        return null
    }

    const getRecent = (weights)=> {
        if (weights.length === 0) return null
        return weights.at(-1).weight
    }

    const getInitial = (weights)=> {
        if(weights.length === 0) return null
        return weights[0].weight
    }

    const calc = (initial, recent) => {
        if (initial !== null && recent !== null) return parseFloat(initial) - parseFloat(recent);
        return null;
    };

    useEffect(()=> {
        setRecentWeight(getRecent(weights))
        setInitialWeight(getInitial(weights))
        setLowestWeight(getLowest(weights));
    }, [weights])

    useEffect(() => {
        setTotalWeightLost(calc(initialWeight, recentWeight));
    }, [initialWeight, recentWeight]);


    return (
        <>
            <div>Your initial weight: {initialWeight!== null? initialWeight + user.settings?.unit: "N/A"} </div>
            <div>Your lowest weight: {lowestWeight !== null ? lowestWeight + user.settings?.unit: "N/A"} </div>
            <div>Your most recent weight: {recentWeight !== null? recentWeight + user.settings?.unit: "N/A"} </div>
            <div>The amount of weight you have lost: {totalWeightLost !== null? totalWeightLost + user.settings?.unit: "N/A"}</div>
        </>
    )
}