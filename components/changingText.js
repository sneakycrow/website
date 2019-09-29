import React, { useState } from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  display: flex;
  width: 100%;
`

const ChangingText = ({ textVariants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeVariant = () => {
    if (textVariants[currentIndex + 1] !== undefined) {
      return setCurrentIndex(currentIndex + 1);
    }
    return setCurrentIndex(0);
  };

  return <StyledText onClick={handleChangeVariant}>{textVariants[currentIndex]}</StyledText>;
};

export default ChangingText;
