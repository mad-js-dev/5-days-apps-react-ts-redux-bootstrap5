//import "./TasklistHeader.scss"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { KeyboardEvent, useRef } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";

interface TaskListHeaderProps {
    filterState: number,
    onFilterChange: () => void,
    onTaskAdd: (e: CustomEvent<string>) => void
}

export default function TaskListHeader(props:TaskListHeaderProps) {
    const isTablet = useMediaQuery('(min-width:575.98px)');
    const isDesktop = useMediaQuery('(min-width:992px)');
    const input = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        if(input.current && input.current.value !== "") {
            const event = new CustomEvent("onTaskItemCreate", {detail: input.current.value});
            input.current.value = ""
            input.current.focus()
            
            props.onTaskAdd(event)
        }
    };

    const handleAddTaskKeyPress = (e:KeyboardEvent) => {
        if(e.code === 'Enter') handleAdd()
    }

    return (
        <Container fluid className="m-tasklistHeader p-0">
            <Row className="mb-3">
                <Col xs="12" sm="8" md="9" lg="10">
                    <Stack direction="horizontal" gap={4} className="mb-1">
                        <InputGroup
                            size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                            className="m-tasklistHeader__inputWrapper mb-2"
                        >
                            <Form.Control
                                ref={input}
                                size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                                className="m-tasklistHeader__input"
                                placeholder="Create a new task..."
                                aria-label="Create a new task"
                                onChange={() => false}
                                onKeyUp={(e) => handleAddTaskKeyPress(e)}
                            />
                            <InputGroup.Text className="m-tasklistHeader__addBtnWrapper">
                                <Button 
                                    variant="primary"
                                    size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                                    onClick={() => handleAdd()}
                                >
                                    Add Task
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>
                    </Stack>
                </Col>
                <Col xs="12" sm="4" md="3" lg="2">
                    <div className="d-grid">
                        <Button 
                            variant="outline-light" 
                            size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                            className="p-1 p-lg-2 fw-bold text-uppercase"
                            onClick={() => props.onFilterChange()}
                        >
                            <div className="m-2">
                                {(props.filterState===0)  ? "Pending" :  (props.filterState===1) ? "Complete" : "Show all" }
                            </div>
                        </Button>
                    </div>

                </Col>
            </Row>
        </Container>
    
    )
}