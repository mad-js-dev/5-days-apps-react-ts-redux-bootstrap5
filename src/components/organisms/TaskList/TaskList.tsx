import Stack from 'react-bootstrap/Stack'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../store/store'
import { cycleFilter, createTask, updateTask, deleteTask, Task } from './TaskListSlice'

import "./TaskList.scss"
import TaskListHeader from '../../molecules/TaskListHeader/TaskListHeader'
import TaskListItem from '../../molecules/TaskListItem/TaskListItem'
import TaskListFooter from '../../molecules/TaskListFooter/TaskListFooter';

export default function Tasklist() {
    const dispatch = useDispatch()
    const taskFilter:number = useSelector((state:RootState) => state.taskList.filter)
    const tasksData:Array<Task> = useSelector((state:RootState) => state.taskList.list)
    
    const countIncomplete = ():number => {
      return tasksData.filter((item:Task) => {
        if(!item.complete) return true
        return false

      }).length
    }

    const filterRenderItems = () => {
      return tasksData.map((item:Task) => {
        if(
          (taskFilter === 1 && !item.complete) ||
          (taskFilter === 2  && item.complete) ||
          taskFilter === 0
        ) {
            return (
              <React.Fragment key={item.id}>
                <TaskListItem
                    {...item}
                    onTaskItemUpdate={(e:CustomEvent<Task>) => dispatch(updateTask(e.detail))}
                    onTaskItemRemove={(e:CustomEvent<Task>) => dispatch(deleteTask(e.detail))}
                />  
              </React.Fragment>
            )
        } 
        return (<React.Fragment key={item.id}></React.Fragment>)
      })
    }

    return (
        <>
          <Stack 
              direction="vertical" 
              gap={3} 
              className="o-tasklist p-0"
          >
            <TaskListHeader 
              filterState={taskFilter}
              onFilterChange={() => dispatch(cycleFilter())}
              onTaskAdd={(e:CustomEvent<string>) => dispatch(createTask(e.detail))}
            />
            <div className="o-tasklist__content shadow-lg px-2 py-1 bg-body-tertiary rounded">
                <div className="o-tasklist__listWrapper">
                    { 
                      filterRenderItems()
                    } 
                </div>
              <TaskListFooter taskAmount={ countIncomplete() }/>
            </div>
          </Stack>
        </>
      );
}