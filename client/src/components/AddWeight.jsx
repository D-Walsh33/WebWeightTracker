import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import axios from 'axios'

export default function AddWeight(props){
    const {userId, setWeights} = props
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');


    const handleAddWeight = async(e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/users/weight', {weight, userId, date}, {headers: {Authorization: `Bearer ${token}`}});
            const response2 = await axios.get(`http://localhost:3000/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response2.data);
            setWeight(response2.data.at(-1).weight);
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
                <Form.Control size="lg" type="number" placeholder="Weight"  required onChange={(e)=> setWeight(e.target.value)} />
            </Form.Group>
            <Form.Group>
               <Form.Label>Enter the date here!</Form.Label>
                <Form.Control size="lg" type="date" placeholder="date" required onChange={(e)=> setDate(e.target.value)}/> 
            </Form.Group>
            <Button variant="primary" type="submit">
             Submit
            </Button>
        </Form>
        </Container>
    )
}