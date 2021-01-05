/**
 * Styles: Button
 */

import styled from 'styled-components';
import { shade } from 'polished';

interface IColorProps {
    color: string;
}

export const Container = styled.div<IColorProps>`
    margin-top: 25px;

    h3 {
        color: #FFFFFF;
        font-size: 25px;
        margin-left: 3px;
        text-decoration: none;
    }

    button {
        background-color: ${
            props => {
                switch(props.color) {
                    case 'orange':
                        return '#FF5C00';
                    case 'brown':
                        return '#770000';
                    default:
                        return '#FFFFFF';
                }
            }
        };
        border-radius: 25px;
        border: none;

        height: 80px;
        width: 480px;

        font-size: 30px;
        font-family: 'Poppins', 'sans-serif';
        color: #FFFFFF;
        box-shadow: 1px 1px 3px black;

        transition: background-color 0.2s;
    }

    button:hover {
        background-color: ${
            props => {
                switch(props.color) {
                    case 'orange':
                        return shade(0.2, '#FF5C00');
                    case 'brown':
                        return shade(0.2, '#770000');
                    default:
                        return shade(0.2, '#FFFFFF');
                }
            }
        };
    }`;