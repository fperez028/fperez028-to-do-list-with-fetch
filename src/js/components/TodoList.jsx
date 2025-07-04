import React, { useRef, useState, useEffect } from "react";

export const TodoList = () => {
    const hasInitialized = useRef(false);
    const [tasks, setTasks] = useState([]);
    const [input, setUserInput] = useState("");

    const API_URL = "https://playground.4geeks.com/todo";
    const USERNAME = "fperez028";

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const initializeUser = async () => {
            try {
                const res = await fetch(`${API_URL}/users/${USERNAME}`);

                if (res.ok) {
                    fetchTasks();
                } else if (res.status === 404) {
                    const createRes = await fetch(`${API_URL}/users/${USERNAME}`, {
                        method: "POST"
                    });

                    const responseBody = await createRes.text();
                    console.log("POST status:", createRes.status);
                    console.log("POST response body:", responseBody);

                    if (!createRes.ok) {
                        throw new Error("Failed to create user");
                    }

                    fetchTasks();
                } else {
                    throw new Error(`Unexpected status: ${res.status}`);
                }
            } catch (err) {
                console.error("User initialization error:", err);
            }
        };

      initializeUser();
    }, []);

    const fetchTasks = () => {
        fetch(`${API_URL}/users/${USERNAME}`)
            .then(res => res.json())
            .then(data => {
                const formattedTasks = data.todos.map(item => ({
                    id: item.id,
                    label: item.label,
                    completed: item.done ?? item.is_done
                }));
                setTasks(formattedTasks);
            })
            .catch(err => console.error("Fetch error:", err));
    };

    const addTask = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const newTask = { label: trimmed, done: false };

        fetch(`${API_URL}/todos/${USERNAME}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                setUserInput("");
                fetchTasks();
            })
            .catch(err => console.error("Add task error:", err));
    };

    const deleteTask = (id) => {
        fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(err => console.error("Delete task error:", err));
    };

    const clearAllTasks = () => {
        const deletions = tasks.map(task =>
            fetch(`${API_URL}/todos/${task.id}`, {
                method: "DELETE"
            })
        );

        Promise.all(deletions)
            .then(() => fetchTasks())
            .catch(err => console.error("Clear all error:", err));
    };

    const toggleCompleted = (index) => {
        const taskToUpdate = tasks[index];
        const updatedTask = {
            label: taskToUpdate.label,
            is_done: !taskToUpdate.completed
        };

        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...taskToUpdate,
            completed: !taskToUpdate.completed
        };

        setTasks(updatedTasks);

        fetch(`${API_URL}/todos/${taskToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedTask),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to update task");
            return res.json();
        })
        .then(data => {
            console.log("Updated task from server:", data); // <-- Add this
        })
        .catch(err => console.error("Update error:", err));
    };

    const completedCount = tasks.filter(task => task.completed).length;

    return (
        <div className="container bg-secondary-subtle shadow rounded-4 mt-5 p-3">
            <h1 className="text-center pt-2">To-Do List</h1>

            <input
                id="taskInput"
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
                        <li
                            key={task.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div className="d-flex align-items-center flex-grow-1">
                                <input
                                    id={`taskCompletionCheckbox-${task.id}`}
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={!!task.completed}
                                    onChange={() => toggleCompleted(index)}
                                />
                                <span className={`task-text ${task.completed ? "text-decoration-line-through" : ""}`}>
                                    {task.label}
                                </span>
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm ms-2 delete-btn"
                              onClick={() => deleteTask(task.id)}
                              title="Delete task"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {tasks.length > 0 && (
                <>
                    <div className="text-muted px-1 d-flex justify-content-between">
                        <span>{tasks.length} {tasks.length === 1 ? "item" : "items"}</span>
                        <span>{completedCount} completed</span>
                    </div>
                    <div className="text-center mt-2">
                        <button className="btn btn-primary btn-sm" onClick={clearAllTasks}>
                            Clear All Tasks
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
