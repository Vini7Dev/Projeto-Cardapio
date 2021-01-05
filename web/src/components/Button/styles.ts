/**
 * Styles: Button
 */

import styled from 'styled-components';
import { shade } from 'polished';

interface IColorProps {
    size: string;
    color: string;
}

export const Container = styled.div<IColorProps>`
    margin-top: 25px;

    h3 {
        color: #FFFFFF;
        font-size: 25px;
        margin-left: 3px;
        font-weight: 400;
        text-decoration: none;
    }

    button {
        // Button color configuration
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

        // Size configuration
        // Height
        height: ${
            props => {
                switch(props.size) {
                    case 'normal':
                        return  80;
                    case 'small':
                        return 60;
                    default:
                        return 80;
                }
            }
        }px;
        // Width
        width: ${
            props => {
                switch(props.size) {
                    case 'normal':
                        return  480;
                    case 'small':
                        return 440;
                    default:
                        return 80;
                }
            }
        }px;

        // Font size and weight configuration
        font-size: ${props => props.size === 'small' ? 20 : 25}px;
        font-weight: ${props => props.size === 'small' ? 400 : 600};

        font-family: 'Poppins', 'sans-serif';
        color: #FFFFFF;
        box-shadow: 1px 1px 3px #000000;

        transition: background-color 0.2s;
    }

    button:hover {
        // Button hover color configuration
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
    }
`;