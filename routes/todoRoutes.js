/**
 * used by frontend to add data into database
 */

const router = require('express').Router();
const { models } = require('mongoose');
const todoController = require('../controller/todoController');

router.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
//add a task
router.post('/addTask', async (req, res, next) => {
    try {
        await todoController.addTask(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//update a task
router.put('/updateTask/:taskId',  async (req, res, next) => {
    try {
        await todoController.updateTodo(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//get a task
router.get('/getTask/:taskId', async (req, res, next) => {
    try {
        //console.log("Router taskId passed to controller:", req.params.taskId);
        await todoController.getTodo(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//delete a task
router.delete('/deleteTask/:taskId', async (req, res, next) => {
    try {
        await todoController.deleteTask(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

router.delete('/deleteCompleted', async (req, res, next) => {
    try {
        await todoController.deleteCompleted(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

router.get('/getAllNotCompleted', async (req, res, next) => {
    try {
        await todoController.getAllNotCompleted(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//WHOLE LIST OPERATIONS

//get all tasks
router.get('/getAll', async (req, res, next) => {
    try {
        await todoController.getAll(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//complete all tasks
router.put('/completeAll', async (req, res, next) => {
    try {
        await todoController.completeAll(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

//delete all tasks
router.delete('/deleteAll', async (req, res, next) => {
    try {
        await todoController.deleteAll(req, res, next); // Properly call the function
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

module.exports = router;