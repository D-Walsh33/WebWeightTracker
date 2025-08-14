import { useState, useEffect } from "react";
import axios from 'axios';
import Lineplot from '../components/Lineplot';
import WeightList from "../components/WeightList";
import Stats from '../components/Stats'
import AddWeight from '../components/AddWeight'
import Profile from '../components/Profile'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;


const Dashboard = () => {
    const [weights, setWeights] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUserAndWeights = async ()=> {
        try {
            const token = localStorage.getItem('token');
            const response1 = await axios.get(`${apiUrl}/api/users/me`, {headers: {Authorization: `Bearer ${token}`}});

            setUser(response1.data.user)
            console.log(response1.data.user)
            const response2 = await axios.get(`${apiUrl}/api/users/${response1.data.user._id}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data)
            
        } catch (error) {
            console.error("Error fetching weights", error)
            if (error.response.data.error == 'Invalid token'){
                alert('Your token has expired. Please login again.');
                navigate('/login');
            }
        }
    }
    
    useEffect(()=>{
        fetchUserAndWeights();
    }, [])
    
    return (
        <div id="dashboard" className="container">
            <Profile user={user} setUser={setUser} />
            <Row className="mb-4">
                <Col className="d-flex" md={6}>
                    <AddWeight userId={user._id} setWeights={setWeights}/>
                </Col>
                <Col className="d-flex" md={6}>
                    <Lineplot weights={weights}/>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex" md={6}>
                    <Stats weights={weights} user={user} setUser={setUser}/>
                </Col>
                <Col className="d-flex" md={6}>
                    <WeightList weights={weights} userId={user._id} user={user} setWeights={setWeights}/>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;