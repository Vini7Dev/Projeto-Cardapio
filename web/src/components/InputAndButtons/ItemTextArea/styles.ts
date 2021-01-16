/**
 * Styles: Add Text Area
 */

import styled from 'styled-components';

interface IItemTextAreaProps {
    isError: boolean;
}

export const Container = styled.div<IItemTextAreaProps>`
    width: 90%;

    margin-bottom: 25px;

    strong {
        margin-left: 15px;

        font-size: 25px;
        line-height: 25px;

        color: ${props => props.isError ? '#FF0000' : '#000000' };

        display: flex;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }

    textarea {
        width: 100%;
        min-height: 50px;

        padding: 15px;

        border: none;
        border-radius: 25px;

        box-shadow: 1px 1px 3px #757575;
        background-color: #ECECEC;

        font-family: 'Poppins', 'sans-serif';
        font-size: 20px;
    }

    @media (max-width: 768px) {
        strong {
            font-size: 20px;
        }

        textarea {
            font-size: 18px;
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
        left: 0;
        bottom: 25px;
        width: 155px;

        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #FFFFFF;

        background-color: #B30000;
        border: 3px solid #800000;
        padding: 5px 10px;
        border-radius: 10px;

        transition: opacity 0.2s
    }
`;