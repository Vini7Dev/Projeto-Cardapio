/**
 * Styles: Item Check Box
 */

import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
        margin-right: 10px;
        font-size: 25px;
    }

    span#custom-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        border-radius: 5px;

        background-color: #39B100;
        color: #FFFFFF;

        font-size: 50px;
        font-family: 'Archivo', 'sans-serif';
    }

    margin-bottom: 25px;
`;