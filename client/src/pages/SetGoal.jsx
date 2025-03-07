import Button from "react-bootstrap/esm/Button"
import { useNavigate, useLocation } from "react-router-dom"
import SetGoalForm from "../components/setGoalForm"

export default function SetGoal(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state

    return (
        <>
        <Button onClick={()=>navigate('/')}>Dashboard</Button>
        <SetGoalForm />
        </>
    )
}