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
                    throw new Error('List not found');
                }
    
                foundList.entries.push(newEntry._id);
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
            updatedFields.updatedAt = new Date();
            const updatedEntry = await entryModel.findByIdAndUpdate(
                entryId,
                updatedFields,
                { new: true }
            );
            
            if (!updatedEntry) {
                throw new Error("Entry not found");
            }

            return updatedEntry;
        } catch (error) {
            throw new Error(`Error updating entry: ${error.message}`);
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
            const entry = await entryModel.findById(entryId);
            if(!entry){
                throw new Error("Entry not found");
            }
            return entry;
        }catch(error){
            throw new Error(`Error fetching entry: ${error.message}`);
        }
    }

    static async deleteEntry(entryId){
        try {
            const entry = await entryModel.findById(entryId);
            if (!entry) {
                throw new Error("Entry not found");
            }

            // Remove entry from its list if it belongs to one
            if (entry.list) {
                await listModel.findByIdAndUpdate(
                    entry.list,
                    { $pull: { entries: entryId } }
                );
            }

            await entryModel.findByIdAndDelete(entryId);
            return entry;
        } catch (error) {
            throw new Error(`Error deleting entry: ${error.message}`);
        }
    }
}

module.exports = EntryService;