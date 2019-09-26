import React, { useState } from 'react';

const ChangingText = ({ textVariants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeVariant = () => {
    if (textVariants[currentIndex + 1] !== undefined) {
      return setCurrentIndex(currentIndex + 1);
    }
    return setCurrentIndex(0);
  };

  return <span onClick={handleChangeVariant}>{textVariants[currentIndex]}</span>;
};

export default ChangingText;
