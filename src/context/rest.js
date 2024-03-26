export const BASE_URL = 'http://52.66.209.174:8080/api/kdp'


export const get = async (path) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const post = async (path, val = {}) =>{
  try {
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
      body: val, // Your request body
    });
    console.log("response:",response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export const put = async (path, val = {}) =>{
  try {
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
      body: val, // Your request body
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export const deleteItem = async (path) =>{
  try {
    
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
