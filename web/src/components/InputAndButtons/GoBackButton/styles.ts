/**
 * Styles: Go Back Button
 */

import styled from 'styled-components';

export const Container = styled.button`
    position: fixed;
    top: 25px;
    left: 25px;

    box-shadow: 1px 1px 3px #000000;
    background-color: #FF5C00;
    border: none;
    border-radius: 50%;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: #FFFFFF;
    }

    @media (max-width: 768px) {
        top: 7px;
        left: 7px;
        padding: 5px;
    }
`;