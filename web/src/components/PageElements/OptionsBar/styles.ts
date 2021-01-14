/**
 * Styles: Options Bar
 */

import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.aside`
    display: flex;
    flex-direction: column;

    padding: 15px 15px;

    a {
        text-decoration: none;
        margin-top: 10px;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #FF7A00;
        box-shadow: 1px 1px 3px #000000;
        color: #FFFFFF;

        width: 100%;
        padding: 10px 15px;

        border: none;
        border-radius: 10px;

        font-size: 20px;
        font-family: 'Poppins', 'sans-serif';
        line-height: 25px;

        transition: background-color 0.2s;

        svg {
            margin-right: 5px;
        }
    }

    button:hover {
        background-color: ${shade(0.2,'#FF7A00')};
    }

    button + button {
        margin-top: 10px;
    }

    @media (max-width: 768px) {
        border-bottom: 2px solid #757575;
    }
`;