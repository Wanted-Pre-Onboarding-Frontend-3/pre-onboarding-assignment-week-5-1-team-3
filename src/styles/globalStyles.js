import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset} 

  * {
    box-sizing: border-box;
    outline: none;
    border: none;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-size: 14px;
    line-height: 1;
    background-color: #d0ecfc;
    display: flex;
    justify-content: center;
    user-select: none;
  }

  ol,
  ul {
	list-style: none;
}

  a {
  text-decoration: none;
  color: inherit;
  }

  a:active,
  a:hover {
    outline: 0;
  }

  input,
  select,
  button {
    border: none;
    outline: none;
    box-sizing: border-box;
    background: none;
  }

  button {
    font: inherit;
    text-decoration: none;
    padding: 0;
    cursor: pointer;
  }

  input {
    text-decoration: none;
    transition: all 0.1s linear;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  strong {
    font-weight: bold;
  }
`;

export default GlobalStyles;
