import { useState, useEffect } from "react"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Card from 'react-bootstrap/Card';
import SetGoalForm from "./SetGoalForm";
import Container from "react-bootstrap/esm/Container";
dayjs.extend(utc);

export default function Stats({user, weights, setUser}){
    const [initialWeight, setInitialWeight]= useState(null)
    const [lowestWeight, setLowestWeight]= useState(null)
    const [recentWeight, setRecentWeight] = useState(null)
    const [totalWeightDif, setTotalWeightDif] = useState(null)
    const [goal, setGoal] = useState(null)
    const [daysTillGoal, setDaysTillGoal] = useState(null)
    const [amtPerDay, setAmtPerDay] = useState(null)

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
        if (initial !== null && recent !== null) return parseFloat(recent) - parseFloat(initial);
        return null;
    };

    const daysTill = (date)=> {
        let date1 = dayjs(date)
        let today = dayjs()
        let dif = date1.diff(today, 'd')
        return dif + 1
    }

    const getAmtPerDay = (goal, recentWeight, daysTill) => {
        let current = parseFloat(recentWeight)
        let goalWeight = parseFloat(goal)
        return (goalWeight - current) / daysTill
    }


    useEffect(()=> {
        setGoal(user.goal?.targetWeight)
        setRecentWeight(getRecent(weights))
        setInitialWeight(getInitial(weights))
        setLowestWeight(getLowest(weights))
        setDaysTillGoal(daysTill(user.goal?.deadline))
    }, [weights, user])

    useEffect(() => {
        setTotalWeightDif(calc(initialWeight, recentWeight));
        setAmtPerDay(getAmtPerDay(goal, recentWeight, daysTillGoal))
    }, [initialWeight, recentWeight, goal, daysTillGoal]);


    return (
        
        <Card body className="w-100">  
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                    <h4 className="mb-0">Statistics</h4>
                    <SetGoalForm  userId={user._id} setUser={setUser}/>
                </div>
            <ListGroup body className="stats">
            <ListGroupItem className="d-flex justify-content-between align-items-start">
                <div>
                    Your initial weight:
                </div>
                <div>
                    {initialWeight!== null? initialWeight + user.settings?.unit: "N/A"}
                </div>
                
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
                <div>
                    Your lowest weight: 
                </div>
                <div>
                    {lowestWeight !== null ? lowestWeight + user.settings?.unit: "N/A"} 
                </div>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
                <div>
                    Your most recent weight: 
                </div>
                <div>
                    {recentWeight !== null? recentWeight + user.settings?.unit: "N/A"} 
                </div>
                
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-start">
                <div>
                    The amount of weight you have lost/gained: 
                </div>
                <div>
                    {totalWeightDif !== null? totalWeightDif.toFixed(2) + user.settings?.unit: "N/A"}
                </div>

            </ListGroupItem>
            {
                goal != null ? <>
                    <ListGroupItem className="d-flex justify-content-between align-items-start">
                        <div>
                            Your Goal weight: 
                        </div>
                        <div>
                            {user.goal?.targetWeight + user.settings?.unit}
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between align-items-start">
                        <div>
                            Amount till your goal: 
                        </div>
                        <div>
                            {initialWeight!== null?recentWeight - user.goal?.targetWeight + user.settings?.unit : 'N/A'}
                        </div>
                    </ListGroupItem>
                    {user.goal.deadline != null ? <>
                    
                    <ListGroupItem className="d-flex justify-content-between align-items-start">
                        <div>
                            Deadline: 
                        </div>
                        <div>
                            {user.goal.deadline? dayjs(user.goal.deadline).utc().format('MM/DD/YYYY') : 'N/A'}
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between align-items-start">
                        <div>
                            Days until deadline: 
                        </div>
                        <div>
                            {daysTillGoal? daysTillGoal: 'N/A'}
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between align-items-start">
                        <div>
                            To make the deadline, you need to lose/gain: 
                        </div>
                        <div>
                            {amtPerDay? amtPerDay.toFixed(2) +user.settings?.unit + '/day': 'N/A'}
                        </div>
                    </ListGroupItem>
                    </>
                    : <>
                    <br/> 
                    <div>Set a deadline to see stats related to that deadline!</div>
                    </>}
                    </>
                    :
                    <>
                    <br/> 
                    <div>Set a goal and a deadline to see stats related to that goal!</div>
                    </>
                }
                </ListGroup>
        </Container>
        </Card>
    )
}