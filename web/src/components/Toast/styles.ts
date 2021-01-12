/**
 * Styles: Toast
 */

import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface IToastContainerProps {
    status: 'success' | 'error';
}

const statusStyles = {
    success: {
        backgroundColor: '#FFFFFF',
        borderColor: '#29A329',
        color: '#29A329',
    },
    error: {
        backgroundColor: '#FFFFFF',
        borderColor: '#B30000',
        color: '#B30000',
    },
}

export const Container = styled(animated.div)<IToastContainerProps>`
    display: block;
    margin: 10px 0;

    button {
        width: 100%;
        height: 100%;

        padding: 15px 25px;
        border-radius: 15px;

        // Toast color status
        ${
            props => css`
                    background-color: ${statusStyles[props.status].backgroundColor};
                    border: 3px solid ${statusStyles[props.status].borderColor};
                    color: ${statusStyles[props.status].color};
                `
        }
    }

    button h1 {
        font-family: 'Poppins', 'sans-serif';
        font-size: 25px;
    }

    button p {
        text-align: left;
        font-family: 'Archivo', 'sans-serif';
        font-size: 20px;
    }

    @media (max-width: 768px) {
        margin: 0 0 2px;
        width: 100%;

        button h1 {
            font-size: 20px;
        }

        button p {
            font-size: 18px;
        }
    }
`;