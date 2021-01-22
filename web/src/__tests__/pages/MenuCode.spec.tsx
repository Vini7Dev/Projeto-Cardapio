/**
 * Test: Menu Code
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import MenuCode from '../../pages/MenuCode';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
    };
})

describe('Page: Menu Code', () => {
    it('should be able to go to menu with code', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<MenuCode />);

        // Getting form input and submit button
        const codeInput = getByPlaceholderText('123ABC');
        const submitButton = getByTestId('submit-button');

        // Fill input
        fireEvent.change(codeInput, { target: { value: 'Code-Example' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect navigate to menu customer
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu/Code-Example');
        });
    });

    it('should not be able to go to menu with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<MenuCode />);

        // Getting form input and submit button
        const codeInput = getByPlaceholderText('123ABC');
        const submitButton = getByTestId('submit-button');

        // Fill input
        fireEvent.change(codeInput, { target: { value: undefined } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect navigate to menu customer
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });
});