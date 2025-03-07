import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Lineplot from '../components/Lineplot';
import WeightList from "../components/WeightList";
import Stats from '../components/Stats'
import AddWeight from '../components/AddWeight'
import Button from "react-bootstrap/esm/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {
    const [weights, setWeights] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUserAndWeights = async ()=> {
        try {
            const token = localStorage.getItem('token');
            const response1 = await axios.get('http://localhost:3000/api/users/me', {headers: {Authorization: `Bearer ${token}`}});
            setUser(response1.data.user)
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
            <h2>Dashboard {user.username}</h2>
            <Button onClick={()=>navigate('/setGoal', {state: user})}>Set a goal</Button>
            <Row>
                <Col>
            <AddWeight userId={user._id} setWeights={setWeights}/>
                </Col>
                <Col>
            <WeightList weights={weights} userId={user._id} setWeights={setWeights}/>
                </Col>
            </Row>
            <Row>
                <Col>
            <Stats />
                </Col>
                <Col>
            <Lineplot weights={weights}/>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;