/**
 * Styles: Input
 */

import styled from 'styled-components';

interface IInputProps {
    borderTL: number;
    borderTR: number;
    borderBL: number;
    borderBR: number;
}

export const Container = styled.div<IInputProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 480px;

    // Input border radius configuration
    border-top-left-radius: ${ props => props.borderTL}px;
    border-top-right-radius: ${ props => props.borderTR}px;
    border-bottom-left-radius: ${ props => props.borderBL}px;
    border-bottom-right-radius: ${ props => props.borderBR}px;

    background-color: #FFFFFF;
    box-shadow: 1px 1px 3px #000000;
    margin-bottom: 20px;

    svg {
        margin: 20px;
        color: #959595;
    }

    input {
        height: 100%;
        width: 100%;

        padding: 0 10px;
        border-radius: 25px;
        border: none;

        font-size: 25px;
        font-family: 'Archivo', sans-serif;

        ::placeholder {
            color: #959595;
        }
    }
`;