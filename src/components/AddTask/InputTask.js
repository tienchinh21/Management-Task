import React, { useRef } from 'react';
import classes from "./InputTask.module.css"

const InputTask = (props) => {
    const inputValueRef = useRef();

    const submitTaskHandler = (e) => {
        e.preventDefault();

        const inputValue = inputValueRef.current.value;

        if (inputValue.trim().length > 0) {
            props.onEnterTask(inputValue);
        }

        inputValueRef.current.value = ('');
    };

    return (
        <form className={classes.form} onSubmit={submitTaskHandler} action="">
            <input ref={inputValueRef} type="text" />
            <button>Add Task</button>
        </form>
    );
};

export default InputTask;
