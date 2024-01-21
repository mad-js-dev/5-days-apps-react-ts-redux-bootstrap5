import { configureStore } from '@reduxjs/toolkit'
import tasklistReducer from '../components/organisms/TaskList/TaskListSlice'

export const store = configureStore({
  reducer: {
    taskList: tasklistReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch