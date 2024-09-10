import { useContext, useState, createContext } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("UseTasks must be used within a TaskProvider")
    }
    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res)
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
            }}>
            {children}
        </TaskContext.Provider>
    )
}