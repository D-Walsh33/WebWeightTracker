import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const apiUrl = import.meta.env.VITE_API_URL;


const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e)=> {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, {username, password})
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true); // Update state
            navigate('/');
        } catch (error) {
            alert('Login Failed');
            console.error('Error Logging in.', error);
        }
    }
    return (
        <div>
            <br />
            <h3>Login</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Login
                </Button>
            </Form>
            <div id="register-login">
            <h4> Don't have an account? </h4>
            <h4> 
                <a href="/register">
                    Click here to create a new account.
                </a>
            </h4>
            </div>
        </div>
    )
}

export default Login;