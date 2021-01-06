/**
 * Styles: Add Photo
 */

import styled from 'styled-components';
import { shade } from 'polished';

import AddLogoBackground from '../../assets/images/AddLogoBackground.png';

export const Container = styled.div`
    width: 200px;
    position: relative;
    margin: 30px auto;

    div {
        background-image: url(${AddLogoBackground});
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

    button {
        padding: 15px;
        position: absolute;
        bottom: 0;
        right: 0;

        border: none;
        background-color: #FF5C00;
        border-radius: 50%;

        transition: background-color 0.2s;
    }

    button:hover {
        background-color: ${shade(0.2, '#FF5C00')}
    }
`;