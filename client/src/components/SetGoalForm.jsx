import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

export default function SetGoalForm(){
    return (
    <Container>
        <Form >
            <Form.Group>
                <Form.Label>Enter your goal weight here!</Form.Label>
                <Form.Control size="lg" type="number" step={.01} placeholder="Goal Weight"  required  />
            </Form.Group>
            <Form.Group>
               <Form.Label>Enter a Deadline here if you would like!</Form.Label>
                <Form.Control size="lg" type="date" placeholder="date" /> 
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
             Submit
            </Button>
        </Form>
    </Container>
    )
}
    
    