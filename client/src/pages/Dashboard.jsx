import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Lineplot from '../components/Lineplot';
import WeightList from "../components/WeightList";
import Stats from '../components/Stats'
import AddWeight from '../components/AddWeight'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = ({setIsAuthenticated}) => {
    const [weights, setWeights] = useState([]);
    const [weight, setWeight] = useState(null);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate('/login');
    }
    
    const handleAddWeight = async(e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/users/weight', {weight, userId: user._id}, {headers: {Authorization: `Bearer ${token}`}});
            const response2 = await axios.get(`http://localhost:3000/api/users/${user._id}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data);
            setWeight(null);
            e.target.reset()
        } catch (error) {
            console.error("Error adding a weight")
        }
    }

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
            <button onClick={handleLogout}>Logout</button>
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