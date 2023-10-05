import React from 'react';
import classes from './Tasks.module.css';
import TaskItem from './TaskItem';
import Section from '../UI/Section';

const Tasks = (props) => {

    const deleteTaskHandler = (taskId) => {
        // Tạo một bản sao mới của danh sách nhiệm vụ bằng cách loại bỏ nhiệm vụ có ID tương ứng
        const updatedTasks = props.items.filter(task => task.id !== taskId);

        // Cập nhật danh sách nhiệm vụ
        props.onDeleteTask(updatedTasks);
    };

    let taskList = <p>Hiện tại không có nhiệm vụ nào.</p>;

    if (props.items.length > 0) {
        taskList = (
            <ul>
                {props.items.map((task) => (
                    <TaskItem key={task.id}>
                        {task.text}
                        <div>
                            <button
                                className={classes.delete}
                                onClick={() => deleteTaskHandler(task.id)}
                            >
                                <p className={classes.text}>Xong</p>
                            </button>
                        </div>
                    </TaskItem>
                ))}
            </ul>
        )
    };

    let content = taskList;

    if (props.error) {
        content = <button onClick={props.onFetch}>Try again</button>;
    }

    if (props.loading) {
        content = <p>Đang tải.....</p>
    }

    return (
        <Section>
            <div className={classes.container}>{content}</div>
        </Section>
    );
};

export default Tasks;
