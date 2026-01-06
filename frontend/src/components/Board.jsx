import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Initial data if localStorage is empty
            const initialTasks = [
                { id: 1, title: 'Task 1', description: 'This is the first task', status: 'To Do' },
                { id: 2, title: 'Task 2', description: 'This is the second task', status: 'In Progress' },
                { id: 3, title: 'Task 3', description: 'This is the third task', status: 'Done' }
            ];
            setTasks(initialTasks);
            localStorage.setItem('tasks', JSON.stringify(initialTasks));
        }
    }, []);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const movedTask = updatedTasks.find(task => task.id == draggableId);
        
        if (!movedTask) return;

        movedTask.status = destination.droppableId;
        
        const newTasks = updatedTasks.map(task => 
            task.id == movedTask.id ? movedTask : task
        );
        
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const addTask = (title, description, status) => {
        const newTask = {
            id: Date.now(),
            title,
            description,
            status
        };
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const updateTask = (id, newTitle, newDescription) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, title: newTitle, description: newDescription };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const moveTask = (id, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const columns = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done'),
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {Object.entries(columns).map(([columnId, columnTasks]) => (
                    <Column
                        key={columnId}
                        columnId={columnId}
                        tasks={columnTasks}
                        addTask={addTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default Board;
