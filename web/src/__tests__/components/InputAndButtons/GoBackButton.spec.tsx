/**
 * Test: Go Back Button
 */

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import GoBackButton from '../../../components/InputAndButtons/GoBackButton';

const mockedHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            goBack: mockedHistoryGoBack,
        }),
    };
});

describe('Component: Go Back Button', () => {
    it('should be able to go back', async () => {
        // Render component
        const { getByTestId } = render(<GoBackButton />);

        // Gettin element
        const button = getByTestId('go-back-button');

        // Click in the button
        fireEvent.click(button);

        // Expect component exists
        await waitFor(() => {
            expect(mockedHistoryGoBack).toHaveBeenCalled();
        });
    });
});