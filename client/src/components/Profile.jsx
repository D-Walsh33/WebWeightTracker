import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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

    const changeNotifications = async (notifications) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:3000/api/users/settings', {userId: user._id, settings: {unit: user.settings.unit, notifications} }, {headers: {Authorization: `Bearer ${token}`}});
            const response = await axios.get('http://localhost:3000/api/users/me', {headers: {Authorization: `Bearer ${token}`}});
            setUser(response.data.user)
        } catch (error) {
            console.error("Error Changing Units!", error)
        }
    }
    console.log("User unit setting:", user.settings.unit);
    console.log("User notifications setting:", user.settings.notifications);

    return (
        <>
        <Stack direction="horizontal" gap={3}>
        <h2>{user.username}'s Dashboard
        </h2>
        <Button variant="info" onClick={handleShow} className="btn-sm ms-auto">
            Settings
        </Button>
        </Stack>

        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.username}'s Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div>
                The username for this account: <b>{user.username}</b>
            </div>
            <div>
                The email for this account: <b>{user.email}</b>
            </div>
            <div>
                The current units for this account: <b>{user.settings.unit}</b>
            </div>
            <div>
                Notifications for this account: <br /><b>{user.settings.notifications? 'Does want notifications': 'Does not want notifications!'} </b>
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
            <br /> <br />
          <h4>Set Notifications</h4>
            <ButtonGroup>
            <ToggleButton type="radio" checked={!!user.settings.notifications} onClick={()=>changeNotifications(true)}>
                Notifications please!
            </ToggleButton>
            <ToggleButton type="radio" checked={!user.settings.notifications} onClick={()=>changeNotifications(false)}>
                No thanks!
            </ToggleButton>
            </ButtonGroup>
        </Offcanvas.Body>
      </Offcanvas>
        </>
    )
}