/**
 * AWS Lambda Client
 * 
 * Base client for making requests to AWS Lambda functions.
 * Handles common logic like headers, error handling, and response parsing.
 * 
 * Currently mocks responses, but designed to be easily switched to real API calls.
 */

import { Alert } from 'react-native';

// API Configuration
const API_BASE_URL = 'https://api.findyour11.com/v1'; // Placeholder
const TIMEOUT_MS = 10000;

/**
 * Standard API Response structure
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

/**
 * Call a Lambda function via HTTP
 * 
 * @param path - API endpoint path (e.g., '/users/login')
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param body - Request body (optional)
 * @returns Promise resolving to the response data
 */
export const callLambda = async <T>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<T> => {
    console.log(`[API] ${method} ${path}`, body ? JSON.stringify(body) : '');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Replace with actual fetch call
    /*
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Add auth token if needed
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      const json = await response.json();
      
      if (!response.ok) {
        throw new Error(json.error?.message || 'API request failed');
      }
  
      return json.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
    */

    // For now, return mock data based on path (handled by individual services)
    // This function just acts as a pass-through for the mock implementation pattern
    // In a real app, this would handle the actual network request

    return {} as T; // Placeholder return
};

/**
 * Global Error Handler
 * 
 * Centralized error handling for API requests.
 * Displays user-friendly alerts for common errors.
 */
export const handleApiError = (error: any) => {
    console.error('[API Error]', error);

    let message = 'Something went wrong. Please try again.';

    if (error.message.includes('Network request failed')) {
        message = 'Please check your internet connection.';
    } else if (error.message.includes('Unauthorized')) {
        message = 'Session expired. Please login again.';
        // TODO: Trigger logout flow
    }

    Alert.alert('Error', message);
};
