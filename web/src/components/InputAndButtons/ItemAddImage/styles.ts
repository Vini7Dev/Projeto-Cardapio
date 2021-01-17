/**
 * Styles: Item Add Image
 */

import styled, { css } from 'styled-components';
import { shade } from 'polished';

import DefaultFoodImage from '../../../assets/images/DefaultFoodImage.png';

interface IItemAddImageProps {
    imageURL?: string;
}

export const Container = styled.div<IItemAddImageProps>`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    max-height: 250px;

    margin-bottom: 50px;
    border-radius: 10px 10px 0 0;

    background-color: #FF7A00;

    div#image-preview {
        height: 100vh;

        ${
            props => css`background: url(${props.imageURL || DefaultFoodImage}) no-repeat center;`
        }
        background-size: auto 100%;
    }

    div#add-file-input-area {
        position: absolute;
        bottom: 0px;
        width: 100%;

        label#add-file-label {
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
            font-size: 18px;
            line-height: 15px;
            text-align: center;

            transition: background-color 0.2s;

            svg {
                margin-right: 5px;
            }

            input {
                display: none;
            }
        }
    }

    label:hover {
        background-color: ${shade(0.2, '#39B100')};
    }

    @media (max-width: 768px) {
        div#image-preview {
            height: 150px;
            background-size: 75%;
        }

        div#add-file-input-area {
            label#add-file-label {
                width: 80%;
                font-size: 16px;
            }
        }
    }
`;