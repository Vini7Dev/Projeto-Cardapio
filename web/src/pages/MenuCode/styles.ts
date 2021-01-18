/**
 * Styles: Menu Code
 */

import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
    from {
        transform: translateX(50px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;


    @media (max-width: 768px) {
        padding: 60px 0;
    }
`;

export const AnimationContainer = styled.div`
    animation: ${appearFromRight} 1s;
    width: 60%;

    h1 {
        color: #FFFFFF;
        font-size: 60px;
        margin-bottom: 20px;
    }

    .input-code {
        text-align: center;
    }

    @media (max-width: 768px) {
        width: 90%;

        h1 {
            font-size: 50px;
        }
    }
`;
