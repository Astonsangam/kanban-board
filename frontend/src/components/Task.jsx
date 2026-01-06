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

    return (
        <div style={{ border: '1px solid lightgrey', padding: '8px', marginBottom: '8px', backgroundColor: 'white', borderRadius: '3px', position: 'relative' }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                    <button onClick={handleSave} style={{ marginRight: '5px' }}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                        {isMoving ? (
                            <div>
                                <select onChange={(e) => handleMove(e.target.value)} defaultValue="">
                                    <option value="" disabled>Move to...</option>
                                    {otherColumns.map(col => <option key={col} value={col}>{col}</option>)}
                                </select>
                                <button onClick={() => setIsMoving(false)} style={{ marginLeft: '5px' }}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => setIsMoving(true)} style={{ marginRight: '5px' }}>Move</button>
                                <button onClick={() => setIsEditing(true)} style={{ marginRight: '5px' }}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
