const listRoutes = require('express').Router();
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

module.exports = listRoutes;