import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import AddTask from './components/AddTask/AddTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './components/hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);

    const transFormTask = (taskObj) => {
        const loadedTasks = [];

        for (const taskKey in taskObj) {
            loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
        }

        setTasks(loadedTasks);
    };

    const deleteTaskHandler = (updatedTasks) => {
        setTasks(updatedTasks);
    };

    const { isLoading, error, sendRequest: taskFetch } = useHttp();

    useEffect(() => {
        taskFetch({ url: 'https://react-movies-a5edb-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json' }, transFormTask);
    }, [taskFetch]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <div className="App">
            <h1 className='title'>Management Task</h1>
            <AddTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                onDeleteTask={deleteTaskHandler}
                onFetch={taskFetch}
                loading={isLoading}
                error={error}
            />
        </div>
    );
}

export default App;
