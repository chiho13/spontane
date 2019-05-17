import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  margin: 0 auto;
  max-width: 1000px;
  border-radius: 16px;
  position: ${props => props.fixed ? 'fixed' : 'relative'};
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 20;

  @media (min-width: 700px) {
    width: ${props => props.width || '40%'};
    bottom: initial;
    top: ${props => props.top || '150px'};
    left: initial;
    right: ${props => props.top || '20px'};;
  }

  .fieldset_wrapper {
    @media (min-width: 700px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;

      .wrapper:last-child {
        grid-column: span 2;
      }
    }
  }

  label {
    display: block;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: 'Roboto';
  }

  input {
    -webkit-appearance: none;
    height: 40px;
  }
  input,
  textarea,
  select {
    font-family: 'Roboto';
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #999;
    border-radius: 8px;
    &:focus {
      outline: 0;
      border-color: black;
    }

    @media (min-width: 700px) {
      font-size: 14px;
    }
  }

  input:read-only {
    border: 0;
    background: none;
    font-weight: bold;
    color: #555555;
    padding: 0;
  }

  textarea {
    resize: none;
  }
  button,
  input[type='submit'] {
    width: auto;
    background: ${props => props.theme.black};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600; 
    cursor: pointer;
    margin-top: 2rem;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }

  }
`;

export default Form;
