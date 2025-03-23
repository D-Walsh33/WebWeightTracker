import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import axios from 'axios'
import dateHelper from '../helpers/dateString';
import Card from 'react-bootstrap/Card';

export default function AddWeight(props){
    const {userId, lastWeight, setWeights} = props
    const [weight, setWeight] = useState(lastWeight);
    const [date, setDate] = useState(dateHelper.todayDateString());
    
    const handleAddWeight = async(e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/users/weight', {weight, userId, date:new Date(date).toISOString()}, {headers: {Authorization: `Bearer ${token}`}});
            const response2 = await axios.get(`http://localhost:3000/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data);
        } catch (error) {
            console.error("Error adding a weight", error)
        }
    }



    return (
        <Card body>
                <Container>
                    <h4>Add Weight Entry</h4>
                <Form onSubmit={handleAddWeight}>
                <Form.Group>
                    <Form.Label>Enter your weight here:</Form.Label>
                    <Form.Control size="lg" type="number" step={.01} placeholder="Weight"  required onChange={(e)=> setWeight(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter the date here!</Form.Label>
                    <Form.Control size="lg" type="date" max={dateHelper.todayDateString()} value={date} placeholder="date" required onChange={(e)=> setDate(e.target.value)}/> 
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </Container>
        </Card>
    )
}