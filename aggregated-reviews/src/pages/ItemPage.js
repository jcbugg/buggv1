import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchItemDetails = async (itemName) => {
  const response = await fetch(
    `http://localhost:5000/item/${encodeURIComponent(itemName)}`
  );
  if (!response.ok) throw new Error('Failed to fetch item details');
  return response.json();
};

const ItemPage = () => {
  const { itemName } = useParams();

  const {
    data: itemDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['item', itemName],
    queryFn: () => fetchItemDetails(itemName),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">{error.message}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Item Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {itemDetails.item}
          </h1>
          <p className="text-gray-600 mt-2">
            Explore reviews and top comments for videos related to this item.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemDetails.videos.map((video) => (
            <div
              key={video.video_id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              {/* Video Title */}
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {video.title}
              </h2>

              {/* Comments Section */}
              <div className="space-y-3">
                {video.comments.slice(0, 3).map((comment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 border rounded-md shadow-sm"
                  >
                    <p className="text-gray-600">{comment.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Sentiment:{' '}
                      <span className="font-medium">{comment.sentiment}</span>{' '}
                      (Score: {comment.sentiment_score})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
