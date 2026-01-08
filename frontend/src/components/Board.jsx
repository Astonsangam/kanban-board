import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const API_URL = 'http://localhost:5000/api/tasks';

const Board = () => {
    const [columns, setColumns] = useState({
        'To Do': [],
        'In Progress': [],
        'Done': [],
    });

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(tasks => {
                const newColumns = {
                    'To Do': tasks.filter(task => task.status === 'To Do'),
                    'In Progress': tasks.filter(task => task.status === 'In Progress'),
                    'Done': tasks.filter(task => task.status === 'Done'),
                };
                setColumns(newColumns);
            });
    }, []);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        
        const startColumn = columns[source.droppableId];
        const endColumn = columns[destination.droppableId];
        
        const startTasks = Array.from(startColumn);
        const [removed] = startTasks.splice(source.index, 1);
        
        // Update status in the frontend first for responsiveness
        removed.status = destination.droppableId;

        const newStartTasks = {
            ...columns,
            [source.droppableId]: startTasks,
        };

        if (source.droppableId === destination.droppableId) {
            startTasks.splice(destination.index, 0, removed);
            setColumns(newStartTasks);
        } else {
            const endTasks = Array.from(endColumn);
            endTasks.splice(destination.index, 0, removed);
            const newEndTasks = {
                ...newStartTasks,
                [destination.droppableId]: endTasks,
            };
            setColumns(newEndTasks);
        }

        fetch(`${API_URL}/${draggableId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: destination.droppableId }),
        });
    };

    const addTask = (title, description, status) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        })
            .then(res => res.json())
            .then(newTask => {
                const newColumns = {
                    ...columns,
                    [status]: [...columns[status], newTask],
                };
                setColumns(newColumns);
            });
    };

    const updateTask = (id, newTitle, newDescription) => {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        })
            .then(res => res.json())
            .then(updatedTask => {
                const newColumns = { ...columns };
                for (const column in newColumns) {
                    newColumns[column] = newColumns[column].map(task => {
                        if (task.id === id) {
                            return updatedTask;
                        }
                        return task;
                    });
                }
                setColumns(newColumns);
            });
    };

    const moveTask = (id, newStatus) => {
        let taskToMove;
        const newColumns = { ...columns };

        for (const column in newColumns) {
            const taskIndex = newColumns[column].findIndex(task => task.id === id);
            if (taskIndex > -1) {
                [taskToMove] = newColumns[column].splice(taskIndex, 1);
                break;
            }
        }

        if (taskToMove) {
            taskToMove.status = newStatus;
            newColumns[newStatus].push(taskToMove);
            setColumns(newColumns);

            fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
        }
    };

    const deleteTask = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        }).then(() => {
            const newColumns = { ...columns };
            for (const column in newColumns) {
                newColumns[column] = newColumns[column].filter(task => task.id !== id);
            }
            setColumns(newColumns);
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {Object.entries(columns).map(([columnId, columnTasks]) => (
                    <Column
                        key={columnId}
                        columnId={columnId}
                        tasks={columnTasks}
                        addTask={addTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        data-column-id={columnId}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default Board;
