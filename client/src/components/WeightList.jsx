import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

export default function WeightList({weights, userId, setWeights}){
    const handleDelete = async (weightId) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            await axios.delete('http://localhost:3000/api/users/weight', {
                headers: { Authorization: `Bearer ${token}` },
                data: { weightId, userId } // Correct way to send a body with DELETE
            });
            const response = await axios.get(`http://localhost:3000/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response.data);
        } catch (error) {
            console.error('Error deleting weight entry: ', error);
        }
    }
    return (
        <ListGroup>
            {weights.map((weight, index)=> (
                <ListGroup.Item key={index}>
                    {weight.weight}kgs - {new Date(weight.date).toLocaleDateString()}
                    <br />

                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="danger" size="sm" onClick={()=>{handleDelete(weight._id)}}>Delete</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}