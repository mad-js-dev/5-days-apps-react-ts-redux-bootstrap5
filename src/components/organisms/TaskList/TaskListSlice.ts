import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string,
    description: string,
    complete: Boolean
}

export interface TaskList {
    filter: number,
    list: Task[]
}

const initialState: TaskList = {
    filter: 0,
    list: [
        { id: uuidv4(), description: "Study for the math exam", complete: false },
        { id: uuidv4(), description: "Buy milk and bread at the supermarket", complete: true },
        { id: uuidv4(), description: "Send an email to the project manager", complete: false },
        { id: uuidv4(), description: "Take a short break to relax", complete: false },
        { id: uuidv4(), description: "Meet with the team to discuss projects", complete: false },
        { id: uuidv4(), description: "Prepare the presentation for the meeting", complete: false },
        { id: uuidv4(), description: "Exercise at the gym", complete: true },
        { id: uuidv4(), description: "Research new technologies for the project", complete: false },
        { id: uuidv4(), description: "Call the doctor for the appointment", complete: true },
        { id: uuidv4(), description: "Review and respond to emails", complete: false },
        { id: uuidv4(), description: "Plan summer vacation", complete: false },
        { id: uuidv4(), description: "Clean the house and organize things", complete: false },
        { id: uuidv4(), description: "Read a recommended book", complete: false },
        { id: uuidv4(), description: "Make a call with a friend", complete: false },
        { id: uuidv4(), description: "Learn a new skill or language", complete: false },
        { id: uuidv4(), description: "Listen to an educational podcast", complete: false }
    ]
}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    cycleFilter: (state:TaskList) => {
        if(state.filter === 2) {
            state.filter = 0
        } else {
            state.filter++
        }
    },
    createTask: {
        reducer: (state:TaskList, action:PayloadAction<Task>) => {
            console.log("store create", action.payload)
            state.list.unshift(action.payload)
        },
        prepare: (text: string) => {
            const newItem = {id: uuidv4(), description: text, complete: false} as Task
            return { payload: newItem }
        }
    },
    updateTask: (state:TaskList, action:PayloadAction<Task>) => {
        console.log("store update", action.payload)
        state.list = state.list.map((elem) => {
            return (elem.id === action.payload.id) ? action.payload : elem
        })
    },
    deleteTask: (state:TaskList, action:PayloadAction<Task>) => {
        console.log("store update", action.payload);
        state.list = state.list.filter((elem) => {
            if (elem.id !== action.payload.id) return true;
            return false
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { cycleFilter, createTask, updateTask, deleteTask } = taskListSlice.actions

export default taskListSlice.reducer