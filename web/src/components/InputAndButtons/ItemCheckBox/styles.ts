/**
 * Styles: Item Check Box
 */

import styled from 'styled-components';

interface IItemCheckBoxProps {
    isChecked: boolean;
}

export const Container = styled.button<IItemCheckBoxProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background: none;

    strong {
        margin-right: 10px;
        font-size: 25px;
    }

    div#custom-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        border: none;
        border-radius: 5px;

        // Change color of background when toggle checkbox selection
        background-color: ${ props => props.isChecked ? '#39B100' : '#BCBCBC' };

        color: #FFFFFF;

        font-size: 50px;
        font-family: 'Archivo', 'sans-serif';

        svg {
            // Show or hide X icon when toggle checkbox selection
            display: ${props => props.isChecked ? 'block' : 'none'}
        }
    }

    margin-bottom: 25px;
`;