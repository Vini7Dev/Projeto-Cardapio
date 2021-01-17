/**
 * Styles: Load Screen
 */

import styled from 'styled-components';

export const LoadScreen = styled.div`
    position: relative;

    div#load-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba(0, 0, 0, 0.5);
        z-index: 20;

        span {
            color: #000000;
            background-color: #FFFFFF;
            box-shadow: 3px 3px 3px #000000;

            font-size: 25px;
            font-weight: 700;

            padding: 25px;
            border-radius: 25px;
        }
    }
`;