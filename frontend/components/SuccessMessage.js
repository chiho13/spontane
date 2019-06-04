import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const SuccessStyles = styled.div`
  padding: 1rem;
  background-color: #eaf5ea;
  margin: 1rem 0;
  border: 1px solid #e6f2e6;
  font-size: 0.9rem;
  p {
    margin: 0;
    font-family: 'Roboto';
    font-weight: 100;
    color: #007d1e;
  }
  strong {
    margin-right: 0.5rem;
  }
`;

const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return (
    <SuccessStyles>
      <p >
        {message}
      </p>
    </SuccessStyles>
  );
};

SuccessMessage.defaultProps = {
  message: ""
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;
