/**
 * Test: Forgot Password
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ForgotPassword from '../../pages/ForgotPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory : () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../services/api', () => {
    return {
        post: jest.fn(),
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

describe('Page: Forgot Password', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to send an request to reset password', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ForgotPassword />);

        // Gettinf form input and submit button
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const submitButton = getByTestId('submit-button');

        // Fill input form
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redrect to signin page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/signin');
        });
    });

    it('should not be able to send an request to reset password with invalid email', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ForgotPassword />);

        // Gettinf form input and submit button
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const submitButton = getByTestId('submit-button');

        // Fill input form
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect not redrect to signin page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when request to send mail fails', async () => {
        // Creating error
        mockedAddToast.mockImplementationOnce(() => {
            throw new Error('Forgot password error example');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<ForgotPassword />);

        // Gettinf form input and submit button
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const submitButton = getByTestId('submit-button');

        // Fill input form
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect not redrect to signin page
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith({
                title: 'Falha ao recuperar a senha.',
                description: 'Tente novamente.',
            });
        });
    });
});