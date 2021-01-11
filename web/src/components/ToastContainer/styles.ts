/**
 * Styles: Toast Container
 */

import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 20px;

    @media (max-width: 768px) {
        right: 0;
        width: 100%;
    }
`;