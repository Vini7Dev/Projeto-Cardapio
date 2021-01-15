/**
 * Styles: Food Item Category
 */

import styled from 'styled-components';

export const Container = styled.section`
    width: 95%;

    text-align: center;

    strong.category-title {
        display: block;

        background-color: #FF7A00;
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 15px;

        margin-bottom: 20px;

        font-size: 40px;
        line-height: 70px;
    }

    ul.category-items-list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`;