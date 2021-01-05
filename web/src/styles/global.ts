/**
 * Global Styles
 */

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #C90000;
        height: 100vh;
        width: 100vw;
        font-family: 'Poppins', sans-serif;
    }

    button:hover, input:hover {
        cursor: pointer;
    }
`;