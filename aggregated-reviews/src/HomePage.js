import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';

// Fetch suggestions from the backend API
const fetchSuggestions = async (query) => {
  const response = await fetch(`http://localhost:5000/items?q=${query}`);
  if (!response.ok) throw new Error('Failed to fetch suggestions');
  const data = await response.json();
  return data;
};

const HomePage = () => {
  const [value, setValue] = useState(''); // Input field value
  const [suggestions, setSuggestions] = useState([]); // Suggestions from API
  const navigate = useNavigate();

  // Called when the user types in the input field
  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const fetchedSuggestions = await fetchSuggestions(value);

      // Filter duplicates by checking 'item' values
      const uniqueSuggestions = fetchedSuggestions.filter(
        (suggestion, index, self) =>
          index === self.findIndex((t) => t.item === suggestion.item)
      );

      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Called when the input loses focus or suggestions are cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Navigate to the item page when a suggestion is selected
  const onSuggestionSelected = (event, { suggestion }) => {
    navigate(`/item/${encodeURIComponent(suggestion.item)}`);
  };

  // Renders each suggestion
  const renderSuggestion = (suggestion) => (
    <div className="p-2 hover:bg-blue-100 cursor-pointer">
      {suggestion.item}
    </div>
  );

  // Handles input value changes
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Search for Reviews
        </h1>
        <div className="relative">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.item}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{
              placeholder: 'Search for an item...',
              value,
              onChange,
              className:
                'w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
              style: { border: 'none' }, // Remove the bottom border
            }}
            renderSuggestionsContainer={({ containerProps, children }) => {
              const { key, ...rest } = containerProps;
              return (
                <div
                  {...rest}
                  key={key}
                  className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  {children}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
