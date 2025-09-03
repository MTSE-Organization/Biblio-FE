import React from 'react';
import BookCard from './bookCard';

const BookList = ({ title, books }) => {
  return (
    <div className='mt-10 mb-12 text-center capitalize'>
      <h2 className='mb-10 text-4xl font-bold'>{title}</h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {books?.map((book, index) => (
          <BookCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
