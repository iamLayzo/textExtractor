import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="containerpattern" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .containerpattern {
    position: fixed; 
    width: 100vw; 
    height: 100vh; 
    top: 0;
    left: 0;
    z-index: -1; 

    background: #FF8C00; 
    --gap: 5em;
    --line: 2px; /* Ajustamos el grosor de las líneas a 2px */
    --color: rgb(17, 24, 39);

    background-image: linear-gradient(
        -90deg,
        transparent calc(var(--gap) - var(--line)),
        var(--color) calc(var(--gap) - var(--line) + var(--line)),
        var(--color) var(--gap)
      ),
      linear-gradient(
        0deg,
        transparent calc(var(--gap) - var(--line)),
        var(--color) calc(var(--gap) - var(--line) + var(--line)),
        var(--color) var(--gap)
      );
    background-size: var(--gap) var(--gap); 
  }
`;

export default Pattern;
