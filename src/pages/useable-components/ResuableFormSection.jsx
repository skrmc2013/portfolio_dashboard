import React from 'react';

const ReusableFormSection = ({ title, description, children }) => {
  return (
    <div className='w-full h-full'>
      <div>
        <div className='grid w-[100%] gap-6'>
          <div className='grid gap-2'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='mb-5'>{description}</p>
          </div>
          <div className='grid gap-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableFormSection;
