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
        <div className="column" data-column-id={columnId}>
            <h3>{columnId}</h3>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ flexGrow: 1, minHeight: '100px' }}
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
            <div>
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
                        <button onClick={handleAddTask} className="add-task-btn">Add Task</button>
                        <button onClick={() => setIsAddingTask(false)} style={{ width: '100%', padding: '5px', marginTop: '5px' }}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsAddingTask(true)} className="add-task-btn">Add Task</button>
                )}
            </div>
        </div>
    );
};

export default Column;
