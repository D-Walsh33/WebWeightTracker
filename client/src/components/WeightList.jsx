import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Stack from 'react-bootstrap/Stack';
import EditWeightForm from './EditWeightForm'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
const apiUrl = import.meta.env.VITE_API_URL;


dayjs.extend(utc);

export default function WeightList({weights, userId, setWeights, user}){
    const [show, setShow] = useState(false);
    const [editWeight, setEditWeight] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = async (weightId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${apiUrl}/api/users/weight`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { weightId, userId } // Correct way to send a body with DELETE
            });
            const response = await axios.get(`${apiUrl}/api/users/${userId}/weights`, {headers: {Authorization: `Bearer ${token}`}});
            setWeights(response.data.reverse());
        } catch (error) {
            console.error('Error deleting weight entry: ', error);
        }
    }

    const handleEdit = (weight)=> {
        setEditWeight(weight)
        handleShow()
    }

    const handleEditedWeight= (response)=> {
        setWeights(response)
        handleClose()
    }

    return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Weight Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditWeightForm userId={userId} editWeight={editWeight} onEditedWeight={handleEditedWeight}/>
        </Modal.Body>
        </Modal>
        <Card body className='w-100'> 
        <Container>
            <h4>Previous Weights</h4>
        <ListGroup className='weightList'>
            {weights.map((weight, index)=> (
                <ListGroup.Item key={index}>
                    <Row>
                        <Col className='text-center'>
                        {dayjs(weight.date).utc().format("MM/DD/YYYY")}
                        </Col>
                        <Col className='text-center'> 
                            <div className=''>
                                <b>
                                    {weight.weight} {user.settings.unit} 
                                </b>
                            </div>
                        </Col>
                        <Col>
                            <Stack direction="horizontal" gap={3}>
                            <Button className='p-2 ms-auto' variant="secondary" size="sm" onClick={()=>handleEdit(weight)}><i class="fa-solid fa-pen-to-square"></i></Button>
                            <div className="vr " />
                            <Button className='p-2' variant="danger" size="sm" onClick={()=>{handleDelete(weight._id)}}><i class="fa-solid fa-trash"></i></Button>
                            </Stack>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Container>
        </Card>
    </>
    )
}