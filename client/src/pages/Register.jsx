import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', {username, password});
            navigate('/login');
        } catch(error) {
            alert('Registration failed');
            console.error('Error registering a new user!', error)
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register