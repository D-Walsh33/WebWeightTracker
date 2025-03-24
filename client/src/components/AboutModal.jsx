import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About Weight Tracker
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Hello there! This is a simple web app for tracking your weight. I developed this application to practice using Reactjs and Bootstrap with a nodejs server.
          You can find the Github Repository for this project <a href="https://github.com/D-Walsh33/WebWeightTracker">here!</a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
