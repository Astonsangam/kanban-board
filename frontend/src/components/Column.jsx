import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ columnId, tasks, addTask, updateTask, deleteTask, moveTask }) => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') return;
        addTask(newTaskTitle, newTaskDescription, columnId);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setIsAddingTask(false);
    };

    return (
        <div style={{ margin: '10px', border: '1px solid lightgrey', borderRadius: '5px', width: '30%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ padding: '8px', background: '#f0f0f0', margin: '0' }}>{columnId}</h3>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ padding: '8px', flexGrow: 1, minHeight: '100px' }}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Task task={task} updateTask={updateTask} deleteTask={deleteTask} moveTask={moveTask} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div style={{ padding: '8px', borderTop: '1px solid lightgrey' }}>
                {isAddingTask ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Task description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
                        />
                        <button onClick={handleAddTask} style={{ width: '100%', padding: '5px' }}>Add Task</button>
                        <button onClick={() => setIsAddingTask(false)} style={{ width: '100%', padding: '5px', marginTop: '5px' }}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsAddingTask(true)} style={{ width: '100%', padding: '5px' }}>Add Task</button>
                )}
            </div>
        </div>
    );
};

export default Column;
