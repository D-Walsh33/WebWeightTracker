import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container'

export default function Profile({user, setUser}) {
    if (!user || !user.settings) {
        return <p>Loading user settings...</p>;
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    
    const changeUnits = async (unit) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:3000/api/users/settings', {userId: user._id, settings: {unit, notifications: user.settings.notifications} }, {headers: {Authorization: `Bearer ${token}`}});
            const response = await axios.get('http://localhost:3000/api/users/me', {headers: {Authorization: `Bearer ${token}`}});
            setUser(response.data.user)
        } catch (error) {
            console.error("Error Changing Units!", error)
        }
    }

    return (
    <>  
        <Container>

        <Stack direction="horizontal" gap={3}>
        <h3>{user.username}'s Dashboard</h3>
        <Button variant="secondary" onClick={handleShow} className="btn-sm ms-auto">
            Settings
        </Button>
        </Stack>
        </Container>

        <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.username}'s Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div>
                The username for this account: <b>{user.username}</b>
            </div>
            <div>
                The current units for this account: <b>{user.settings.unit}</b>
            </div>
            <div>
                This account was created on: <b>{new Date(user.createdAt).toDateString()}</b>
            </div> 
            <hr />
            <h4>Set Units:</h4>
            <ButtonGroup>
            <ToggleButton type="radio" checked={user.settings.unit === 'kgs'} onClick={()=>changeUnits('kgs')}>
                kgs
            </ToggleButton>
            <ToggleButton type="radio" checked={user.settings.unit === 'lbs'} onClick={()=>changeUnits('lbs')}>
                lbs
            </ToggleButton>
            </ButtonGroup>
        </Offcanvas.Body>
        </Offcanvas>
    </>
    )
}