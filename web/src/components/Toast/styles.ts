/**
 * Styles: Toast
 */

import styled, { css } from 'styled-components';

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

export const Container = styled.button<IToastContainerProps>`
    // Toast color status
    ${
        props => css`
                background-color: ${statusStyles[props.status].backgroundColor};
                border: 3px solid ${statusStyles[props.status].borderColor};
                color: ${statusStyles[props.status].color};
            `
    }

    display: block;
    border-radius: 15px;
    margin: 10px 0;
    padding: 15px 25px;

    h1 {
        font-family: 'Poppins', 'sans-serif';
        font-size: 25px;
    }

    p {
        text-align: left;
        font-family: 'Archivo', 'sans-serif';
        font-size: 20px;
    }
`;