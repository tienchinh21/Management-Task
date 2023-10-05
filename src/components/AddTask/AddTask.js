import React, { useState } from 'react';

import InputTask from './InputTask';
import useHttp from '../hooks/use-http';
import Section from '../UI/Section';

const AddTask = (props) => {

    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createTask = (taskText, taskData) => {

        const generatedId = taskData.name;
        const created = { id: generatedId, text: taskText };

        props.onAddTask(created);
    };

    const addTaskHandler = async (taskText) => {
        sendTaskRequest({
            url: 'https://react-movies-a5edb-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { text: taskText }
        }, createTask.bind(null, taskText));
    };

    return (
        <Section>
            <InputTask onEnterTask={addTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default AddTask;
