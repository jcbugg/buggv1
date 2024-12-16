import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Fetch item details from the backend API
const fetchItemDetails = async (item) => {
  const response = await fetch(
    `http://localhost:5000/item-details?item=${encodeURIComponent(item)}`
  );
  if (!response.ok) throw new Error('Failed to fetch item details');
  return await response.json();
};

const ItemPage = () => {
  const { id } = useParams(); // Get the item name from the URL
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItemDetails = async () => {
      try {
        const data = await fetchItemDetails(id);
        setItemDetails(data);
      } catch (err) {
        console.error('Error fetching item details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItemDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {itemDetails.item}
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          User Reviews and Comments
        </h2>

        {/* Check if there are reviews */}
        {itemDetails.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemDetails.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  {review.title || 'User Comment'}
                </h3>
                <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    <strong>Sentiment:</strong> {review.sentiment}
                  </span>
                  <span>
                    <strong>Score:</strong> {review.sentimentScore.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No reviews available for this item.
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
