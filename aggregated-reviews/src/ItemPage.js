import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const fetchItemDetails = async (item) => {
  const response = await fetch(
    `http://localhost:5000/item-details?item=${encodeURIComponent(item)}`
  );
  if (!response.ok) throw new Error('Failed to fetch item details');
  return await response.json();
};

const ItemPage = () => {
  const { id } = useParams(); // Capture the item name from URL
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItemDetails = async () => {
      try {
        const data = await fetchItemDetails(id);
        setItemDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItemDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{id}</h1>
        <h2 className="text-2xl mb-3">Top Reviews</h2>
        {itemDetails.reviews.length > 0 ? (
          <ul className="list-disc pl-6">
            {itemDetails.reviews.map((review, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">{review.comment}</p>
                <p>Sentiment: {review.sentiment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
