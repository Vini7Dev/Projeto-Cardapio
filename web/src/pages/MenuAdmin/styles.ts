/**
 * Styles: Menu
 */

import styled from 'styled-components';
import { shade } from 'polished';

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

export const MenuSide = styled.main`
    background-color: #E6E6E6;
    width: 100%;
    height: 100%;
`;

export const MenuCode = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #2F2F2F;
    background-color: #FFFFFF;
    border-bottom: 2px solid #757575;
    padding: 10px 15px;

    p {
        font-size: 25px;
    }

    strong {
        font-size: 50px;
        line-height: 50px;
    }

    button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 5px 10px;

        border: none;
        border-radius: 10px;
        box-shadow: 1px 1px 3px #000000;
        background-color: #39B100;
        color: #FFFFFF;

        font-size: 20px;
        font-family: 'Poppins', 'sans-serif';

        transition: background-color 0.2s;
    }

    button:hover {
        background-color: ${shade(0.2, '#39B100')};
    }

    @media (max-width: 768px) {
        p {
            font-size: 20px;
        }

        strong {
            font-size: 30px;
        }

        button {
            position: relative;
            bottom: 0;
            right: 0;
        }
    }
`;

export const MenuArea = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 20px 0;
`;

export const AddItemButtonArea = styled.div`
    display: flex;
    justify-content: center;

    button {
        background-color: #39B100;
        color: #FFFFFF;

        width: 90%;
        padding: 8px 0;
        border-radius: 15px;
        border: none;
        box-shadow: 1px 1px 3px #000000;

        font-size: 40px;
        font-family: 'Poppins', 'sans-serif';

        transition: background-color 0.2s;
    }

    button:hover {
        background-color: ${shade(0.2, '#39B100')};
    }

    @media (max-width: 768px) {
        button {
            font-size: 25px;
        }
    }
`;