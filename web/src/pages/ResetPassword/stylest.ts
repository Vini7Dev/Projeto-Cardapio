/**
 * Styles: Forgot Password
 */

import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
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
    animation: ${appearFromLeft} 1s;

    width: 60%;

    h1 {
        color: #FFFFFF;
        font-size: 60px;
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
    }

    @media (max-width: 768px) {
        width: 90%;

        h1 {
            font-size: 50px;
            line-height: 50px;
        }
    }
`;