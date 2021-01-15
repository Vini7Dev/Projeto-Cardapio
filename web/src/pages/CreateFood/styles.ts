/**
 * Styles: Create Food
 */

import styled from 'styled-components';

export const Container = styled.div`
    width: 98.91%;
    height: 100%;

    display: flex;
    justify-content: start;

    @media (max-width: 768px) {
        display: block;
        width: 100%;
    }
`;

export const CreateItemSide = styled.main`
    background-color: #E6E6E6;
    width: 100%;
    height: 100%;

    div#add-item-button {
        width: 95%;
        margin: 0 auto;
    }
`;

export const CreateItemArea = styled.section`
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 95%;
        margin: 25px auto;
        border-radius: 10px;

        background-color: #FFFFFF;
        box-shadow: 1px 1px 3px #757575;
    }
`;