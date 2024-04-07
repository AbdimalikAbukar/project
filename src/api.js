let lastFetchTime = 0;
// Define the minimum interval between consecutive fetches
const MIN_FETCH_INTERVAL = 5000; // 5 seconds

// Function to fetch trivia questions from the API
export const fetchQuestions = async () => {
  try {
    // Get the current time
    const currentTime = Date.now();

    // Check if the elapsed time since the last fetch is less than the minimum interval
    if (currentTime - lastFetchTime < MIN_FETCH_INTERVAL) {
      // Log a message and return an empty array
      console.log('Too many requests. Please try again later.');
      return { results: [] };
    }
    
    // Update the last fetch time to the current time
    lastFetchTime = currentTime;
    
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    // If an error occurs during the fetch process, log the error and return an empty array
    console.error('Error fetching data:', error);
    return { results: [] };
  }
};


  