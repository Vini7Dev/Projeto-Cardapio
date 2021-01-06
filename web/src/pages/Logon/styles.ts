/**
 * Styles: Logon
 */

import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;

    div#page-content {
        width: 60%;
    }

    h1 {
        color: #FFFFFF;
        font-size: 60px;
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 50px;
        }

        div#page-content {
            width: 90%;
        }
    }
`;