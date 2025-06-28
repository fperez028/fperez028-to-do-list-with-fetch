import React, { useState } from "react";

export const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setUserInput] = useState("");

    const addTask = () => {
        const task = input.trim();
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]);
            setUserInput("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCompleted = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedCount = tasks.filter(task => task.completed).length;

    return (
        <div className="container bg-secondary-subtle shadow rounded-4 mt-5">
            <h1 className="text-center pt-2">To-Do List</h1>

            <input
                type="text"
                className="form-control text-center"
                placeholder="Type task here and press Enter"
                value={input}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <ul className="list-group shadow mt-3 mb-2">
                {tasks.length === 0 ? (
                    <li className="list-group-item text-muted text-center">
                        No pending tasks. You're all caught up!
                    </li>
                ) : (
                    tasks.map((task, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center flex-grow-1">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={task.completed}
                                    onChange={() => toggleCompleted(index)}
                                />
                                <span className="task-text">{task.text}</span>
                            </div>
                            <span className="text-danger fw-bold delete-btn" onClick={() => deleteTask(index)} role="button">
                                x
                            </span>
                        </li>
                    ))
                )}
            </ul>

            {tasks.length > 0 && (
                <div className="text-muted px-1 d-flex justify-content-between">
                    <span>{tasks.length} {tasks.length === 1 ? "item" : "items"}</span>
                    <span>{completedCount} completed</span>
                </div>
            )}
        </div>
    );
};