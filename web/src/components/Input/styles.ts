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
    input {
        height: 80px;
        width: 480px;

        // Input border radius configuration
        border-top-left-radius: ${ props => props.borderTL}px;
        border-top-right-radius: ${ props => props.borderTR}px;
        border-bottom-left-radius: ${ props => props.borderBL}px;
        border-bottom-right-radius: ${ props => props.borderBR}px;
        border: none;

        box-shadow: 1px 1px 3px #000000;

        padding: 10px;
        margin-bottom: 20px;

        text-align: center;
        font-size: 25px;
        font-family: 'Archivo', sans-serif;

        ::placeholder {
            color: #959595;
        }
    }
`;