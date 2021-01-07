/**
 * Styles: Home
 */

import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div#page-content {
        width: 60%;
    }

    h1 {
        color: #FFFFFF;
        font-size: 60px;
    }

    a {
        text-decoration: none;
    }

    @media (max-width: 768px) {
        div#page-content {
            width: 90%;

            h1 {
                font-size: 50px;
            }
        }
    }
`;