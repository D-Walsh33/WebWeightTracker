import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import dateHelper from '../helpers/dateString';
import axios from 'axios';

function SetGoalForm({userId}) {
  const [show, setShow] = useState(false);
  const [weight, setWeight] = useState('');
  const [deadline, setDeadline] = useState(null);

  const handleSave = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:3000/api/users/goal', {userId, targetWeight:weight, deadline}, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response);
        setDeadline(null);
        setWeight('');
        handleClose();
    } catch (error) {
        console.error('Error setting a new goal', error)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Set Goal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
                <Form.Label>Enter your goal weight here!</Form.Label>
                <Form.Control size="lg" type="number" step={.01} placeholder="Goal Weight" autoFocus required onChange={(e)=> setWeight(e.target.value)} />
            </Form.Group>
            <Form.Group>
               <Form.Label>Enter a Deadline here if you would like!</Form.Label>
                <Form.Control size="lg" type="date" placeholder="date" min={dateHelper.todayDateString()} onChange={(e)=> setDeadline(e.target.value)}/> 
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SetGoalForm;

    