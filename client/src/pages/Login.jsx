import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e)=> {
        e.preventDefault();
        try {
            console.log(username, password)
            const response = await axios.post('http://localhost:3000/api/users/login', {username, password})
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
            <h2>Login</h2>
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
                Submit
                </Button>
            <h3>
                <a href="/register">
                    Register
                </a>
            </h3>
            </Form>
        </div>
    )
}

export default Login;