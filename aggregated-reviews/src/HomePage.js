import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

// Fetch suggestions from the backend API
const fetchSuggestions = async (query) => {
  const response = await fetch(`http://localhost:5000/items?q=${query}`);
  if (!response.ok) throw new Error('Failed to fetch suggestions');
  const data = await response.json();
  return data;
};

const HomePage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  // Called when the input value changes
  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      console.log('Fetching suggestions for:', value);
      setSuggestions([]); // Clear previous suggestions

      const fetchedSuggestions = await fetchSuggestions(value);

      // Filter duplicates
      const uniqueSuggestions = fetchedSuggestions.filter(
        (v, i, a) => a.findIndex((t) => t.item === v.item) === i
      );

      setSuggestions(uniqueSuggestions);
      console.log('Updated suggestions:', uniqueSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Clears suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Renders the suggestion item
  const renderSuggestion = (suggestion) => <div>{suggestion.item}</div>;

  // Updates the input value
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Search for Reviews
        </h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.item}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search for an item...',
            value,
            onChange,
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
