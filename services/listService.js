const listModel = require('../models/list.model');
const entryModel = require('../models/entry.model');
const entryService = require('../services/entryService');

class ListService{
    static async createList(listData) {
        try {
            const newList = new listModel(listData);
            return await newList.save();
        } catch (error) {
            throw new Error(`Error creating list: ${error.message}`);
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

    static async getFilteredEntries(listId, filter = {}) {
        try {
            const list = await listModel.findById(listId).populate('entries');
            if (!list) {
                throw new Error("List not found");
            }

            let entries = list.entries;
            
            if (filter.completed !== undefined) {
                entries = entries.filter(entry => entry.completed === filter.completed);
            }

            return entries;
        } catch (error) {
            throw new Error(`Error filtering entries: ${error.message}`);
        }
    }

    static async getIncompleteEntries(listId) {
        try {
            const list = await listModel.findById(listId).populate('entries');
            if (!list) {
                throw new Error("List not found");
            }

            // Filter for incomplete entries
            const incompleteEntries = list.entries.filter(entry => !entry.completed);
            return incompleteEntries;
        } catch (error) {
            throw new Error(`Error getting incomplete entries: ${error.message}`);
        }
    }

    static async getRandomEntry(listId, onlyIncomplete = false) {
        try {
            const list = await listModel.findById(listId).populate('entries');
            if (!list || !list.entries.length) {
                throw new Error("No entries found in list");
            }

            let eligibleEntries = list.entries;
            if (onlyIncomplete) {
                eligibleEntries = list.entries.filter(entry => !entry.completed);
                if (eligibleEntries.length === 0) {
                    throw new Error("No incomplete entries found in list");
                }
            }

            const randomIndex = Math.floor(Math.random() * eligibleEntries.length);
            return eligibleEntries[randomIndex];
        } catch (error) {
            throw new Error(`Error getting random entry: ${error.message}`);
        }
    }

    static async resetListEntries(listId) {
        try {
            const list = await listModel.findById(listId);
            if (!list) {
                throw new Error("List not found");
            }

            // Reset all entries to incomplete
            await entryModel.updateMany(
                { list: listId },
                { completed: false }
            );

            list.lastReset = new Date();
            await list.save();

            return list;
        } catch (error) {
            throw new Error(`Error resetting list: ${error.message}`);
        }
    }

    static async addTag(listId, tagId) {
        try {
            const list = await listModel.findByIdAndUpdate(
                listId,
                { $addToSet: { tags: tagId } },
                { new: true }
            );
            if (!list) {
                throw new Error("List not found");
            }
            return list;
        } catch (error) {
            throw new Error(`Error adding tag: ${error.message}`);
        }
    }
}

module.exports = ListService;