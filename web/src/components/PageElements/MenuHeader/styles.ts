/**
 * Styles: Menu Header
 */

import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    justify-content: initial;
    align-items: center;

    background-color: #FFFFFF;
    border-bottom: 2px solid #757575;

    padding: 15px 5px;

    img {
        max-width: 100px;
        width: 100%;
        margin-right: 5px;
    }

    h1 {
        color: #2F2F2F;
        font-size: 50px;
        line-height: 45px;
    }

    @media (max-width: 768px) {
        justify-content: center;

        img {
            max-width: 75px;
        }

        h1 {
            font-size: 35px;
            line-height: 35px;
        }
    }
`;