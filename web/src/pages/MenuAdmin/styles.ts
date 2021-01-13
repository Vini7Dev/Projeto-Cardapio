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

export const OptionsBar = styled.aside`
    display: flex;
    flex-direction: column;

    padding: 15px 15px;

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #FF7A00;
        box-shadow: 1px 1px 3px #000000;
        color: #FFFFFF;

        border: none;
        border-radius: 10px;
        padding: 10px 15px;

        font-size: 20px;
        font-family: 'Poppins', 'sans-serif';
        line-height: 25px;

        transition: background-color 0.2s;

        svg {
            margin-right: 5px;
        }
    }

    button:hover {
        background-color: ${shade(0.2,'#FF7A00')};
    }

    button + button {
        margin-top: 10px;
    }

    @media (max-width: 768px) {
        border-bottom: 2px solid #757575;
    }
`;

export const MenuSide = styled.main`
    background-color: #E6E6E6;
    width: 100%;
    height: 100%;
`;

export const MenuHeader = styled.header`
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
    }

    @media (max-width: 768px) {
        justify-content: center;

        img {
            max-width: 75px;
        }

        h1 {
            font-size: 35px;
        }
    }
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

    section.category-content {
        width: 95%;

        text-align: center;

        h2 {
            background-color: #FF7A00;
            color: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 15px;

            margin-bottom: 20px;

            font-size: 40px;
            line-height: 70px;
        }

        ul.category-items-list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
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

export const MenuFooter = styled.footer`
    background-color: #770000;
    color: #FFFFFF;

    margin-top: 25px;
    padding: 25px;

    font-size: 20px;
`;