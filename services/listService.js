const listModel = require('../models/list.model');
const entryModel = require('../models/entry.model');
const entryService = require('../services/entryService');

class ListService{
    static async createList(entryData){
        try{
            const newList = new listModel(entryData);
            if(entryData.listCollection){
                const collection = await Collection.findById(entryData.listCollection);
                if(!collection){
                    throw new Error('Collection not foud');
                }
                collection.lists.push(newList._id);
                await collection.save();
            }            
            return await newList.save();
        }catch(error){
            throw new Error('Error adding list:' + error.message);
        }
    }

    static async deleteList(listId){
        try{
            const toDelete = await listModel.deleteOne({ _id: taskId });
        if(!toDelete){
            throw new Error("List not found");
        }
        return toDelete;
        }catch(error){
            throw new Error('Error fetching List' + error.message);
        }
    }

    static async updateList(listId, updatedFields) {
        try {
            const updatedList = await listModel.findByIdAndUpdate(
                listId,
                updatedFields,
                { new: true } // Return the updated document
            );

            return updatedList; // Return the updated document or null if not found
        } catch (error) {
            throw new Error("Error updating List: " + error.message);
        }
    }

    static async moveList(listId, collectionId) {
        try {
            const movedList = await listModel.findByIdAndUpdate(
                listId,
                collectionId,
                { new: true } // Return the updated document
            );

            return movedList; // Return the updated document or null if not found
        } catch (error) {
            throw new Error("Error updating List: " + error.message);
        }
    }

    static async deleteList(listId) {
        try {
            const toDelete = await listModel.findById(listId); // Find the list by ID
            if (!toDelete) {
                throw new Error("List not found");
            }
    
            const tasks = toDelete.tasks;
    
            // Ensure tasks are deleted
            if (tasks && tasks.length > 0) {
                for (const taskId of tasks) {
                    await entryService.deleteEntry(taskId); // Delete each entry
                }
            }
    
            // Delete the list itself
            await listModel.findByIdAndDelete(listId);
    
            return toDelete;
        } catch (error) {
            throw new Error("Error deleting list: " + error.message);
        }
    }

    static async getAllIncomplete(listId){
        try{
            const listFound = await listModel.findById(listId).populate('tasks');
            if(!listFound){
                throw new Error("List not found");
            }

            const tasks = listFound.tasks;

            const incompleteTasks = tasks.filter(task => !task.completed);
            return incompleteTasks;
        }catch(error){
            throw new Error('Error fetching list' + error.message);
        }
    }

}

module.exports = ListService;