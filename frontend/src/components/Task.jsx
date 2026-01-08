import React, { useState } from 'react';

const Task = ({ task, updateTask, deleteTask, moveTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [isMoving, setIsMoving] = useState(false);

    const handleSave = () => {
        updateTask(task.id, editedTitle, editedDescription);
        setIsEditing(false);
    };

    const handleMove = (newStatus) => {
        moveTask(task.id, newStatus);
        setIsMoving(false);
    };

    const columns = ['To Do', 'In Progress', 'Done'];
    const otherColumns = columns.filter(c => c !== task.status);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
        }
    };

    return (
        <div className="task">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <div className="task-actions">
                        {isMoving ? (
                            <div>
                                <select onChange={(e) => handleMove(e.target.value)} defaultValue="">
                                    <option value="" disabled>Move to...</option>
                                    {otherColumns.map(col => <option key={col} value={col}>{col}</option>)}
                                </select>
                                <button onClick={() => setIsMoving(false)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => setIsMoving(true)}>Move</button>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
