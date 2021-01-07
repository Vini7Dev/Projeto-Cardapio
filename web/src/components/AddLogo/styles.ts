/**
 * Styles: Add Photo
 */

import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    max-width: 300px;
    position: relative;
    margin: 30px auto;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    label {
        padding: 15px;
        position: absolute;
        bottom: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #FF5C00;
        border-radius: 50%;

        transition: background-color 0.2s;

        & input {
            display: none;
        }
    }

    label:hover {
        background-color: ${shade(0.2, '#FF5C00')}
    }

    @media (max-width: 768px) {
        max-width: 200px;
    }
`;