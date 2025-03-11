import { useState, useEffect } from "react";
import axios from 'axios';
import Lineplot from '../components/Lineplot';
import WeightList from "../components/WeightList";
import Stats from '../components/Stats'
import AddWeight from '../components/AddWeight'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SetGoalForm from "../components/SetGoalForm";

const Dashboard = () => {
    const [weights, setWeights] = useState([]);
    const [user, setUser] = useState({});

    const fetchUserAndWeights = async ()=> {
        try {
            const token = localStorage.getItem('token');
            const response1 = await axios.get('http://localhost:3000/api/users/me', {headers: {Authorization: `Bearer ${token}`}});
            setUser(response1.data.user)
            console.log(response1.data.user)
            const response2 = await axios.get(`http://localhost:3000/api/users/${response1.data.user._id}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data)
            
        } catch (error) {
            console.error("Error fetching weights", error)
        }
    }
    
    useEffect(()=>{
        fetchUserAndWeights()
    }, [])
    
    return (
        <div>
            <Row>
                <Col>
                    <AddWeight userId={user._id} setWeights={setWeights}/>
                </Col>
                <Col>
                    <Lineplot weights={weights}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stats weights={weights} user={user} setUser={setUser}/>
                </Col>
                <Col>
                    <WeightList weights={weights} userId={user._id} setWeights={setWeights}/>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;