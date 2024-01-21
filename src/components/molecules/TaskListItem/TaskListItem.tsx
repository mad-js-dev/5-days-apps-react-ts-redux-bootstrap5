import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";

import "./TaskListItem.scss"
import { Icon } from '../../atoms/Icon/Icon';
import { Task } from '../../organisms/TaskList/TaskListSlice';

interface TaskListItemsProps {
    id: string,
    description: string,
    complete: Boolean,
    onTaskItemUpdate: (event:CustomEvent) => void,
    onTaskItemRemove: (event:CustomEvent<Task>) => void,
}

export default function TasklistItems(props:TaskListItemsProps) {
    const isTablet = useMediaQuery('(min-width:575.98px)');
    const isDesktop = useMediaQuery('(min-width:992px)');
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState(props.description);
    const  input = useRef(null!);

    const handleEditClick = () => {
        console.log('click', editMode)
        const inputElement = input.current as HTMLInputElement

        if(!editMode) {
            inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length)
            inputElement.focus();
            setEditMode(!editMode);
            } else {
            inputElement.blur()
            setEditMode(!editMode);
        }
    }

    const handleDescriptionChange = (e:React.ChangeEvent) => {
        const changeEvent = e.nativeEvent as InputEvent;
        const inputElement = input.current as HTMLInputElement;

        if(changeEvent.inputType === "insertLineBreak") {
            inputElement.blur()
            setEditMode(false)
            return false
        } 
        setDescription(inputElement.value)
        auto_grow();
    }

    //Event emiters
    const handleRemoveClick = () => {
        let result:Task = { 
            id: props.id, 
            description: description, 
            complete: props.complete
        }
        const event = new CustomEvent("onTaskItemRemove", {detail: result });
        props.onTaskItemRemove(event)
    }

    const handleDoneClick = () => {
      if(!editMode) {
        let result:Task = { 
            id: props.id, 
            description: description, 
            complete: !props.complete
        }
        const event = new CustomEvent("onTaskItemUpdate", {detail: result});
        props.onTaskItemUpdate(event)
    }
    }

    const handleDescriptionBlur = () => {
      let result = { 
          id: props.id, 
          description: description, 
          complete: props.complete
      }
      const event = new CustomEvent("onTaskItemUpdate", {detail: result});
      props.onTaskItemUpdate(event)
      setEditMode(false)
    }
    
    useEffect(() => {
      setDescription(props.description);
      auto_grow();
    }, [props.description]);
    
    useEffect(() => {
      
      auto_grow();
      window.addEventListener('resize', auto_grow)

      return () => {window.removeEventListener('resize', auto_grow)}
    }, []);

  
  const auto_grow = () => {
    if(input.current!=null) {
      const inputElement:HTMLInputElement = input.current;
      console.log("trollo", inputElement.offsetHeight, '-',  inputElement.scrollHeight)
      inputElement.style.height = 'auto'
      inputElement.style.height = (inputElement.scrollHeight <= 32) ? "32px" : (inputElement.scrollHeight) + "px";
    }
  }

  return (
    <>
      <Stack 
        direction="horizontal" 
        gap={0} 
        className = {
          "m-tasklistItem " +
          `${editMode ? 'm-tasklistItem--editMode ' : '' }` +
          `${props.complete ? 'm-tasklistItem--isComplete ' : '' }` +
          "mb-2 me-2"
        }
      >
        <div className="m-tasklistItem__content">
            <div className="m-tasklistItem__contentWrapper"
              onClick={(e) => { handleDoneClick() }}
            >
              <Form.Group className="input-group p-1 pe-2">
                  <Form.Control 
                    as="textarea"
                    ref={input}
                    size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                    placeholder="Create a new task"
                    value={description} 
                    onChange={(e) => handleDescriptionChange(e)}
                    onBlur={() => handleDescriptionBlur()}
                    />
              </Form.Group>
            </div>
        </div>
        <ButtonToolbar className="m-tasklistItem__actions pt-2" aria-label="Actions applicable:">
            <Button 
                onClick={() => handleEditClick()} 
                size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                className="m-tasklistItem__actionBtn me-1 px-2 py-1 px-md-3 py-md-2">
              <Icon 
                iconName="Pen"
                color="white"
                size={16}
              />
              <span>Edit</span>
            </Button>
            <Button 
                onClick={() => handleRemoveClick()} 
                size={(isDesktop) ? "lg" : (isTablet) ? undefined : "sm"}
                className="m-tasklistItem__actionBtn px-2 py-1 px-md-3 py-md-2">
              <Icon 
                iconName="Trash"
                color="white"
                size={16}
              />
              <span>Remove</span>
            </Button>
        </ButtonToolbar>
      </Stack>
    </>
  );
}
