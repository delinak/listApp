/**
 * handle incoming HTTP requests and response
 */
const todoService = require('../services/todoService');

// calls createTodo method to handle saving, and sends a response
exports.addTask = async(req,res,next) =>{
    try {
        const {task,completed,desc,category} = req.body;
        let entry = await todoService.addTask(task,completed,desc,category);
        res.status(200).json({ message: 'Task added successfully!' });
        res.json({status:true, success:entry});
    }catch (error){
        next(error);
    }
}

exports.updateTodo = async (req, res, next) => {
    try {
        const { taskId } = req.params; // Extract taskId from route params
        const { task, completed, desc, category } = req.body;

        // Filter out null/undefined fields to avoid unnecessary updates
        const updatedFields = {};
        if (task !== undefined) updatedFields.task = task;
        if (completed !== undefined) updatedFields.completed = completed;
        if (desc !== undefined) updatedFields.desc = desc;
        if (category !== undefined) updatedFields.category = category;

        const updatedTodo = await todoService.updateTodo(taskId, updatedFields);

        if (!updatedTodo) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }

        res.json({ status: true, success: updatedTodo });
    } catch (error) {
        next(error);
    }
};

exports.getTodo = async(req,res,next) =>{
    try{
        const {taskId} = req.params;
        console.log("Controller received taskId:", taskId);

        if(!taskId){
            return res.status(400).json({ status: false, message: "Invalid Task ID" });
        }
        const receivedTodo = await todoService.getTodo(taskId);
        if(!receivedTodo){
            return res.status(404).json({status: false, message: 'Task not found'});
        }
        console.log("Controller received taskId:", receivedTodo);
        res.json({status: true, sucess: receivedTodo});
    }catch(error){
        next(error);
    }
};

exports.deleteCompleted = async(req,res,next) =>{
    try{
        const completedTodo = await todoService.deleteCompleted();
        if(!completedTodo){
            return res.status(404).json({status: false, message: 'Task not found'});
        }
        res.json({status: true, sucess: completedTodo});
    }catch(error){
        next(error);
    }
};

exports.deleteTask = async(req,res,next) =>{
    try{
        const {taskId} = req.params;

        if(!taskId){
            return res.status(400).json({ status: false, message: "Invalid Task ID" });
        }
        const receivedTodo = await todoService.deleteTask(taskId);
        if(!receivedTodo){
            return res.status(404).json({status: false, message: 'Task not found'});
        }
        res.json({status: true, sucess: receivedTodo});
    }catch(error){
        next(error);
    }
};

exports.getAllNotCompleted = async(req,res,next) =>{
    try{
        const tasks = await todoService.getAllNotCompleted();
        if(!tasks){
            return res.status(404).json({status: false, message: 'Tasks not found'});
        }
        res.json({status: true, sucess: tasks});
    }catch(error){
        next(error);
    }  
};

exports.getAll = async(req,res,next) =>{
    try{
        const tasks = await todoService.getAll();
        if(!tasks){
            return res.status(404).json({status: false, message: 'Tasks not found'});
        }
        res.json({status: true, sucess: tasks});
    }catch(error){
        next(error);
    }  
};

exports.completeAll = async(req,res,next) =>{
    try{
        const tasks = await todoService.completeAll();
        if(!tasks){
            return res.status(404).json({status: false, message: 'Tasks not found'});
        }
        res.json({status: true, sucess: tasks});
    }catch(error){
        next(error);
    }  
};

exports.deleteAll = async(req,res,next) =>{
    try{
        const tasks = await todoService.deleteAll();
        if(!tasks){
            return res.status(404).json({status: false, message: 'Tasks not found'});
        }
        res.json({status: true, sucess: tasks});
    }catch(error){
        next(error);
    }  
};