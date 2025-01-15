/**
 * Abstracts logic for interacting with DB. 
 * example defines how to save todo in db language
 */

const todoModel = require('../models/todo.model');

class TodoServices{
    static async addTask(task,completed,desc,category){
        const createTodo = new todoModel({task,completed,desc,category});
        return await createTodo.save();
    }

    static async updateTodo(taskId, updatedFields) {
        try {
            const updatedTodo = await todoModel.findByIdAndUpdate(
                taskId,
                updatedFields,
                { new: true } // Return the updated document
            );

            return updatedTodo; // Return the updated document or null if not found
        } catch (error) {
            throw new Error("Error updating task: " + error.message);
        }
    }

    static async getTodo(taskId){
        try{
            const todo = await todoModel.findById(taskId);
            if(!todo){
                throw new Error("Task not found");
            }
            return todo;
        }catch(error){
            throw new Error('Error fetching task' + error.message);
        }
    }

    static async deleteTask(taskId){
        try{
            const toDelete = await todoModel.deleteOne({ _id: taskId });
        if(!toDelete){
            throw new Error("Task not found");
        }
        return toDelete;
        }catch(error){
            throw new Error('Error fetching task' + error.message);
        }
    }

    static async deleteCompleted(taskId){
        try{
            const toDelete = await todoModel.deleteMany({ completed: true });
        if(!toDelete){
            throw new Error("Task not found");
        }
        return toDelete;
        }catch(error){
            throw new Error('Error fetching task' + error.message);
        }
    }

    static async getAllNotCompleted(){
        try{
            const tasks = await todoModel.find({completed: false},{_id: 0,task:1, completed:1, description:1, category:1});
            if(!tasks){
                throw new Error("Tasks not found");
            }
            return tasks;
        }catch(error){
            throw new Error('Error fetching tasks' + error.message);
        }
    }

    static async getAll(){
        try{
            const tasks = await todoModel.find({},{_id: 0,task:1, completed:1, description:1, category:1});
            if(!tasks){
                throw new Error("Tasks not found");
            }
            return tasks;
        }catch(error){
            throw new Error('Error fetching tasks' + error.message);
        }
    }

    static async completeAll(){
        try{
            const completed = await todoModel.updateMany({completed: true});
            if(!completed){
                throw new Error("Tasks not found");
            }
            return completed;
        }catch(error){
            throw new Error('Error fetching tasks' + error.message);
        }
    }

    static async deleteAll(){
        try{
            const deleted = await todoModel.deleteMany({});
            if(!deleted){
                throw new Error("Tasks not found");
            }
            return deleted;
        }catch(error){
            throw new Error('Error fetching tasks' + error.message);
        }
    }
}


module.exports = TodoServices;