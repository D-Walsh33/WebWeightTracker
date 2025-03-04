import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [weights, setWeights] = useState([]);
    const [weight, setWeight] = useState(null)

    const navigate = useNavigate();

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }
    
    const handleAddWeight = async(e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/weight', {weight}, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response.data.weights);
            setWeight(null);
        } catch (error) {
            console.error("Error adding a weight")
        }
    }
    
    useEffect(()=>{
        const fetchWeights = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/weight', {headers: {Authorization: `Bearer ${token}`}});
                setWeights(response.data.weights)
            } catch (error) {
                console.error("Error fetching weights")
            }
        }

        fetchWeights();
    }, [])
    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>

            <form onSubmit={handleAddWeight}>
                <input type="number" onChange={(e)=> setWeight(e.target.value)}/>
                <button type="submit">Add Weight</button>
            </form>
            <ul>
                {weights.map((w, windex)=> (
                    <li key={windex}>{w.date} - {w.weight}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;