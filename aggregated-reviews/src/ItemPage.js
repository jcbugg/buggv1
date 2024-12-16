import React from 'react';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">{id}</h1>
        <p className="text-center text-gray-600">
          Details for {id} will go here.
        </p>
      </div>
    </div>
  );
};

export default ItemPage;
