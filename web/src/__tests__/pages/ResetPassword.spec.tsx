/**
 * Test: Reset Password
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../services/api', () => {
    return {
        post: jest.fn(),
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        useParams: () => ({ token: 'Token' }),
    };
});

jest.mock('../../hooks/load', () => {
    return {
        useLoad: () => ({
            setLoad: jest.fn(),
        }),
    };
});

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedAddToast,
        }),
    };
});

describe('Page: Reset Password', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to reset password', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ResetPassword />);

        // Getting form inputs and submit button
        const passwordInput = getByPlaceholderText('Informe a nova senha');
        const confirmPasswordInput = getByPlaceholderText('Confirme a nova senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(passwordInput, { target: { value: 'newPass123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newPass123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to signin page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/signin');
        });
    });

    it('should not be able to reset password with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ResetPassword />);

        // Getting form inputs and submit button
        const passwordInput = getByPlaceholderText('Informe a nova senha');
        const confirmPasswordInput = getByPlaceholderText('Confirme a nova senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to signin page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalledWith('/signin');
        });
    });

    it('should be able to display a notification error when reset password fails', async () => {
        // Create error
        mockedAddToast.mockImplementationOnce(() => {
            throw new Error('Reset password error example');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ResetPassword />);

        // Getting form inputs and submit button
        const passwordInput = getByPlaceholderText('Informe a nova senha');
        const confirmPasswordInput = getByPlaceholderText('Confirme a nova senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(passwordInput, { target: { value: 'newPass123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newPass123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to signin page
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith({
                title: 'Falha ao alterar a senha.',
                description: 'Tente novamente.',
            });
        });
    });
});