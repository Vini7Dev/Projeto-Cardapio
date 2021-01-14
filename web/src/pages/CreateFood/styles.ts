/**
 * Styles: Create Food
 */

import styled from 'styled-components';

import DefaultFoodImage from '../../assets/images/DefaultFoodImage.png';

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 95%;
    margin: 25px auto;
    border-radius: 10px;

    background-color: #FFFFFF;
    box-shadow: 1px 1px 3px #757575;

    div#add-item-image {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 100%;
        max-height: 250px;

        div#image-preview {
            height: 250px;

            background: url(${DefaultFoodImage}) no-repeat center;
        }

        margin-bottom: 50px;
        border-radius: 10px 10px 0 0;

        background-color: #FF7A00;

        button {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 35%;
            max-width: 300px;
            height: 50px;

            padding: 0 10px;

            border: none;
            border-radius: 25px;
            margin: 0 auto -25px;

            box-shadow: 1px 1px 3px #000000;
            background-color: #39B100;
            color: #FFFFFF;

            font-family: 'Poppins', 'sans-serif';
            font-size: 20px;
            line-height: 15px;

            svg {
                margin-right: 5px;
            }
        }
    }

    @media (max-width: 768px) {
        div#add-item-image {
            div#image-preview {
                height: 150px;
                background-size: 75%;
            }

            button {
                width: 80%;
                font-size: 15px;
            }
        }
    }
`;