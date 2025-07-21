import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const apiUrl = import.meta.env.VITE_API_URL; 



const Register = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/users/register`, {username, password});
            console.log(response)
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true); // Update state
            navigate('/');
        } catch(error) {
            alert('Registration failed');
            console.error('Error registering a new user!', error)
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                 Register
                </Button>
            </Form>
            <div id="register-login">
            <h4>Already have an account?</h4>
            <h4>
                <a href="/login">
                    Click here to login.
                </a>
            </h4>
            </div>
        </div>
    )
}

export default Register