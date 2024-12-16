import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Fetch suggestions from the backend API
const fetchSuggestions = async (query) => {
  try {
    console.log('Starting API request for query:', query); // Debugging
    const response = await fetch(`http://localhost:5000/items?q=${query}`);
    console.log('Response received with status:', response.status); // Debugging
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    console.log('API response data:', data); // Debugging
    if (!Array.isArray(data)) throw new Error('API response is not an array');
    return data;
  } catch (error) {
    console.error('Error during API fetch:', error); // Debugging
    return [];
  }
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [suggestions, setSuggestions] = useState([]); // List of suggestions
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ['items', searchQuery],
    queryFn: () => fetchSuggestions(searchQuery),
    enabled: false, // Manual fetching
    onSuccess: (data) => {
      console.log('Fetched suggestions from API (onSuccess):', data); // Debugging
      if (Array.isArray(data)) {
        setSuggestions(data);
        console.log('setSuggestions called with:', data); // Debugging
      } else {
        console.error('API did not return an array:', data); // Debugging
        setSuggestions([]);
      }
    },
    onError: (error) => {
      console.error('Error fetching suggestions (onError):', error); // Debugging
      setSuggestions([]);
    },
  });

  useEffect(() => {
    console.log('Search Query Changed:', searchQuery); // Debugging
    if (searchQuery.trim().length > 0) {
      console.log('Calling refetch for query:', searchQuery); // Debugging
      refetch();
    } else {
      setSuggestions([]);
      console.log('Cleared suggestions as query is empty'); // Debugging
    }
  }, [searchQuery, refetch]);

  useEffect(() => {
    console.log('Suggestions state changed:', suggestions); // Debugging
  }, [suggestions]);

  const handleSelect = (item) => {
    console.log('Selected item:', item); // Debugging
    navigate(`/item/${item}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Search for Reviews
        </h1>
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for an item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {console.log('Rendering dropdown with suggestions:', suggestions)}{' '}
              {/* Debugging */}
              <ul className="list-none p-0 m-0">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.item}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(suggestion.item)}
                  >
                    {suggestion.item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
