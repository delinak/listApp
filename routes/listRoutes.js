const listRoutes = require('express').Router();
const List = require('../models/list.model');
const Entry = require('../models/entry.model');
const listController = require('../controller/listController');

//create a new list
listRoutes.post('/createList', async (req, res, next) => {
    try {
        await listController.createList(req, res, next); 
    } catch (error) {
        next(error);
    }
});

//update a list name and/or description
listRoutes.put('/updateList/:listId', async (req, res, next) => {
    try {
        await listController.updateList(req, res, next); 
    } catch (error) {
        next(error); 
    }
});

// //move a new list
// listRoutes.put('/moveList/:listId/:collectionId', async (req, res, next) => {
//     try {
//         await listController.moveList(req, res, next); 
//     } catch (error) {
//         next(error); 
//     }
// });

//delete list
listRoutes.delete('/deleteList/:listId', async (req, res, next) => {
    try {
        await listController.deleteList(req, res, next); 
    } catch (error) {
        next(error); 
    }
});

listRoutes.get('/getAllIncomplete/:listId', async (req, res, next) => {
    try {
        await listController.getAllIncomplete(req, res, next); 
    } catch (error) {
        next(error); 
    }
});


// router.delete('/deleteCompleted', async (req, res, next) => {
//     try {
//         await todoController.deleteCompleted(req, res, next);
//     } catch (error) {
//         next(error); 
//     }
// });

// router.get('/getAllNotCompleted', async (req, res, next) => {
//     try {
//         await todoController.getAllNotCompleted(req, res, next); 
//     } catch (error) {
//         next(error); 
//     }
// });

//WHOLE LIST OPERATIONS

// //get all tasks
// router.get('/getAll', async (req, res, next) => {
//     try {
//         await todoController.getAll(req, res, next);
//     } catch (error) {
//         next(error);
//     }
// });

// //complete all tasks
// router.put('/completeAll', async (req, res, next) => {
//     try {
//         await todoController.completeAll(req, res, next); 
//     } catch (error) {
//         next(error); 
//     }
// });

// //delete all tasks
// router.delete('/deleteAll', async (req, res, next) => {
//     try {
//         await todoController.deleteAll(req, res, next); 
//     } catch (error) {
//         next(error); 
//     }
// });

module.exports = listRoutes;