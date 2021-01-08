/**
 * Styles: Input
 */

import styled, { css } from 'styled-components';

interface IInputProps {
    borderTL: number;
    borderTR: number;
    borderBL: number;
    borderBR: number;
    isFocus: boolean;
    isFilled: boolean;
    isError: boolean;
}

export const Container = styled.div<IInputProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100%;

    // Input border radius configuration
    border-top-left-radius: ${ props => props.borderTL}px;
    border-top-right-radius: ${ props => props.borderTR}px;
    border-bottom-left-radius: ${ props => props.borderBL}px;
    border-bottom-right-radius: ${ props => props.borderBR}px;

    background-color: #FFFFFF;
    box-shadow: 1px 1px 3px #000000;
    margin-bottom: 20px;

    // Input filled border effect
    ${
        props => props.isFilled && css`border: 3px solid #29A329;`
    }

    // Focus border effect
    ${
        props => props.isFocus && css`border: 3px solid #FF5C00;`
    }

    // Border error effect
    ${
        props => props.isError && css`border: 5px solid #B30000;`
    }

    svg {
        margin: 20px;
        color: #959595;

        // Input filled border effect
        ${
            props => props.isFilled && css`color: #29A329;`
        }

        // Focus border effect
        ${
            props => props.isFocus && css`color: #E6AC00;`
        }

        // Border error effect
        ${
            props => props.isError && css`color: #B30000;`
        }
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

export const ErrorAlert = styled.div`
    position: relative;

    &:hover {
        span {
            opacity: 1;
        }
    }

    span {
        opacity: 0;

        position: absolute;
        right: 0px;
        bottom: 80px;
        width: 155px;

        font-size: 20px;
        color: #FFFFFF;

        background-color: #B30000;
        border: 3px solid #800000;
        padding: 5px 10px;
        border-radius: 10px;

        transition: opacity 0.2s
    }
`;