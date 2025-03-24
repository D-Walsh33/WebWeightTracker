import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import {useState} from 'react'
import dateHelper from '../helpers/dateString';
const apiUrl = import.meta.env.VITE_API_URL;

export default function EditWeightForm({editWeight, userId, onEditedWeight}){
    const [newWeight, setNewWeight] = useState(editWeight.weight);
    const [newDate, setNewDate] = useState(editWeight.date.split('T')[0]);

    const handleEditWeight = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${apiUrl}/api/users/weight`, {userId, weightId:editWeight._id, newWeight, newDate}, {headers: { Authorization: `Bearer ${token}` }})
            const response = await axios.get(`${apiUrl}/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            onEditedWeight(response.data)
        } catch (error) {
            console.error('Error Editing weight: ', error)
        }
    }

    return (
        <Container>
        <Form onSubmit={handleEditWeight}>
            <Form.Group>
                <Form.Label>Enter your weight here!</Form.Label>
                <Form.Control size="lg" type="number" step={.01} placeholder="Weight" value={newWeight} required onChange={(e)=> setNewWeight(e.target.value)} />
            </Form.Group>
            <Form.Group>
               <Form.Label>Enter the date here!</Form.Label>
                <Form.Control size="lg" type="date" max={dateHelper.todayDateString()} value={newDate} placeholder="date" required onChange={(e)=> setNewDate(e.target.value)}/> 
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
             Submit
            </Button>
        </Form>
        </Container>
    )
}