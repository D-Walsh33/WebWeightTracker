import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import axios from 'axios'

export default function AddWeight(props){
    const {userId, setWeights} = props
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');
    
    const todayDateString = ()=> {
        let today = new Date()
        let month = today.getMonth() + 1
        let day = today.getDate()
        let year = today.getFullYear()
        if (month < 10) month = '0'+ month.toString()
        if (day < 10) day = '0'+ day.toString()
        return year.toString() + '-' + month+ '-'+ day
    }

    const handleAddWeight = async(e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/users/weight', {weight, userId, date}, {headers: {Authorization: `Bearer ${token}`}});
            const response2 = await axios.get(`http://localhost:3000/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data);
            setWeight('');
            e.target.reset()
        } catch (error) {
            console.error("Error adding a weight", error)
        }
    }



    return (
        <Container>
        <Form onSubmit={handleAddWeight}>
            <Form.Group>
                <Form.Label>Enter your weight here!</Form.Label>
                <Form.Control size="lg" type="number" step={.01} placeholder="Weight"  required onChange={(e)=> setWeight(e.target.value)} />
            </Form.Group>
            <Form.Group>
               <Form.Label>Enter the date here!</Form.Label>
                <Form.Control size="lg" type="date" max={todayDateString()} placeholder="date" required onChange={(e)=> setDate(e.target.value)}/> 
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
             Submit
            </Button>
        </Form>
        </Container>
    )
}