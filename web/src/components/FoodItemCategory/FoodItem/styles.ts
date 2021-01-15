/**
 * Styles: Food Item
 */

import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IImageProps {
    image_url: string;
}

export const Container = styled.li`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 250px;
    min-height: 250px;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 3px #757575;

    margin: 10px;
    border-radius: 10px;
    list-style: none;
`;

export const RemoveItemButton = styled.button`
    z-index: 10;

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;
    top: -10px;
    left: -10px;

    border: none;
    border-radius: 50%;


    box-shadow: 1px 1px 5px #757575;
    background-color: #C90000;
    color: #C0C0C0;
    font-size: 25px;

    transition: background-color 0.2s;

    &:hover {
        background-color: ${shade(0.2, '#C90000')};
    }
`;

export const ItemContent = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 250px;
    padding-bottom: 30px;

    border: none;
    border-radius: 10px;
    text-align: left;

    div.discount-percent {
        position: absolute;
        background-color: #0050C9;
        color: #FFFFFF;

        font-size: 25px;
        font-weight: 600;
        font-family: 'Poppins', 'sans-serif';

        top: 0;
        right: 0;
        padding: 5px 10px;
        border-radius: 0 7px 0 25px;
    }
`;

export const ItemImageContent = styled.div<IImageProps>`
    position: relative;
    box-shadow: 0 2px 1px #000000;
    min-height: 120px;

    border-radius: 10px 10px 0 0;
    background-color: #FFBD80;

    div.item-image {
        /** Display image in background */
        ${
            props => css`background: url(${props.image_url}) no-repeat center center;`
        }
        background-size: 100%;

        display: block;
        width: 100%;
        height: 150px;

        border-radius: 10px 10px 0 0;
    }

    div.desable-info {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        border-radius: 1px solid blue;

        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px 10px 0 0;

        font-weight: 600;
        font-size: 25px;
    }
`;

export const ItemDataContent = styled.div`
    background-color: #FFFFFF;
    margin-top: -5px;
    padding: 5px;

    border-radius: 10px;

    div.item-data {
        strong.item-title {
            color: #E2B100;
            font-size: 25px;
            text-shadow: 1px 1px 1px #000000;
        }

        p.item-description {
            margin-top: 5px;
            font-family: 'Archivo', 'sans-serif';
            font-size: 15px;
            color: #2F2F2F;
        }
    }

    div.item-price {
        position: absolute;
        bottom: 5px;
        right: 10px;

        display: flex;
        align-items: flex-end;

        font-family: 'Poppins', 'sans-serif';

        p.price-on {
            color: #008C0E;
            font-weight: 600;
            font-size: 20px;
        }

        p.price-off {
            color: #A4A4A4;
            margin-left: 5px;
            font-size: 15px;
            text-decoration: line-through;
        }
    }
`;

export const EditItemButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    font-size: 18px;
    font-family: 'Poppins', 'sans-serif';

    border: none;
    padding: 8px 0;
    border-radius: 0 0 10px 10px;

    background-color: #FFE5CC;
    color: #994A00;

    svg {
        margin-right: 5px;
    }

    transition: background-color 0.2s;

    &:hover {
        background-color: ${shade(0.05, '#FFE5CC')};
        text-decoration: underline;
    }
`;