const BASE_URL = 'http://localhost:3000'; // Change this to your API URL

export const createEntry = async (entryData) => {
  try {
    const response = await fetch(`${BASE_URL}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create entry');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Error creating entry: ${error.message}`);
  }
};

export const createList = async (listData) => {
  try {
    const response = await fetch(`${BASE_URL}/list/createList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create list');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Error creating list: ${error.message}`);
  }
}; 