/**
 * Styles: Home
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
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div#logo {
        margin-top: 50px;

        img {
            display: block;
            width: 45%;
            margin: 0 auto;
            border-radius: 0 0 50px 50px;
        }

        p {
            text-align: center;
            color: #FFFFFF;
            margin-bottom: 20px;
        }
    }

    @media (max-width: 768px) {
        div#logo img {
            width: 75%;
        }
    }
`;

export const AnimationContainer = styled.div`
    animation: ${appearFromLeft} 1s;

    width: 60%;
    padding: 50px 0;

    h1 {
        color: #FFFFFF;
        font-size: 60px;
    }

    a {
        text-decoration: none;
    }


    @media (max-width: 768px) {
        width: 90%;

        h1 {
            font-size: 50px;
        }
    }
`;