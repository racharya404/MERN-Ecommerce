import React from 'react';

const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="bg-[#485769] text-white text-center"
        style={{
          display: 'block',
          padding: '15px 0',
          lineHeight: '19px',
          fontSize: '13px',
        }}
      >
        <button onClick={handleClick} className="w-full">
          Back To Top
        </button>
      </div>
    </>
  );
};

export default BackToTop;
