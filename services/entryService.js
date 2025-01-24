/**
 * Abstracts logic for interacting with DB. 
 * example defines how to save todo in db language
 */

const entryModel = require('../models/entry.model');
const listModel = require('../models/list.model');

class EntryService{
    static async createEntry(entryData){
        try {
            // Create a new entry
            const newEntry = new entryModel(entryData);
    
            if (entryData.list) { 
                const foundList = await listModel.findById(entryData.list);
                if (!foundList) {
                    throw new Error('Entry not found');
                }
    
                foundList.tasks.push(newEntry._id);
                await foundList.save(); 
            }
            console.log(newEntry);
            return await newEntry.save();
        } catch (error) {
            throw new Error(`Error creating entry: ${error.message}`);
        }
    }

    static async updateEntry(entryId, updatedFields) {
        try {
            const existingEntry = await entryModel.findById(entryId);
            if(!existingEntry){
                throw new Error("Entry not found");
            }

            if(updatedFields.list !== undefined){
                if(existingEntry.list){
                    const oldList = await listModel.findById(existingEntry.list);
                    if(oldList){
                        oldList.tasks.pull(entryId);
                        await oldList.save();
                    }
                }
    
                const newList = await listModel.findById(updatedFields.list);
                if( !newList){
                    throw new Error("NewList not found");
                }
                newList.tasks.push(entryId);
                await newList.save();
            }

            const updatedEntry = await entryModel.findByIdAndUpdate(entryId, updatedFields, { new: true });
            return updatedEntry; // Return the updated document or null if not found
        } catch (error) {
            throw new Error("Error updating task: " + error.message);
        }
    }

    // static async markEntryCompleted(taskId){
    //     try{
    //         const todo = await entryModel.findByIdAndUpdate(taskId, {completed: true});
    //         if(!todo){
    //             throw new Error("Task not found");
    //         }
    //         return todo;
    //     }catch(error){
    //         throw new Error('Error fetching task' + error.message);
    //     }
    // }

    static async getEntry(entryId){
        try{
            const todo = await entryModel.findById(entryId);
            if(!todo){
                throw new Error("Task not found");
            }
            return todo;
        }catch(error){
            throw new Error('Error fetching task' + error.message);
        }
    }

    static async deleteEntry(entryId){
        try{
            const toDelete = await entryModel.deleteOne({ _id: entryId });
        if(!toDelete){
            throw new Error("Task not found");
        }
        return toDelete;
        }catch(error){
            throw new Error('Error fetching task' + error.message);
        }
    }
}

module.exports = EntryService;