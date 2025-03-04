import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e)=> {
        e.preventDefault();
        try {
            console.log(username, password)
            const response = await axios.post('http://localhost:3000/auth/login', {username, password})
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Login Failed');
            console.error('Error Logging in.', error);
        }

    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="username" onChange={(e)=> setUsername(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;