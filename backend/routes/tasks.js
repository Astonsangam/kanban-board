const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../models/tasks.json');

const readTasksFromFile = () => {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
};

const writeTasksToFile = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
router.get('/', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
    const tasks = readTasksFromFile();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(t => t.id == req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    writeTasksToFile(tasks);
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const newTasks = tasks.filter(t => t.id != req.params.id);

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: 'Task not found' });
    }

    writeTasksToFile(newTasks);
    res.status(204).send();
});

module.exports = router;