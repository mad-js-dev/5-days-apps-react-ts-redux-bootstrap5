import "./TaskListFooter.scss"
import { Link } from "react-router-dom";
import TaskListCounter from '../../atoms/TaskListCounter/TaskListCounter'
import Stack from 'react-bootstrap/Stack'

interface TaskListFooterProps {
    taskAmount: number,
}

export default function TaskListFooter(props:TaskListFooterProps) {

    return (
        <Stack 
            direction="horizontal" 
            gap={4} 
            className="m-tasklistFooter pt-3 px-2 fs-6 fs-md-5 fw-light"
        >
            <div className="m-tasklistFooter__content">
                <TaskListCounter count={props.taskAmount} />
            </div>
            <div className="m-tasklistFooter__about ">
                <Link to="/about">About</Link>
            </div>
        </Stack>
    )
}