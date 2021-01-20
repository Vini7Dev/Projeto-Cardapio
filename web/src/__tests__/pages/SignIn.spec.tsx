/**
 * Test: SignIn
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedLogin = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        Link: ({ children }: { children: React.ReactNode }) => children,
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            login: mockedLogin,
        }),
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
    }
});

describe('Page: SignIn', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to login', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignIn />);

        // Getting form inputs and submit button elements
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const passwordInput = getByPlaceholderText('Informe sua senha');
        const submitButton = getByTestId('submit-button');

        // Fill inputs
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should not be able to login with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignIn />);

        // Getting form input and submit button elements
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const passwordInput = getByPlaceholderText('Informe sua senha');
        const submitButton = getByTestId('submit-button');

        // Fill incorrect input
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: '0' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect not redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when login fails', async () => {
        // Condigure auth login mock to fails
        mockedLogin.mockImplementation(() => {
            throw new Error('Login fails error');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignIn />)

        // Getting form input and submit button elements
        const emailInput = getByPlaceholderText('Informe seu e-mail');
        const passwordInput = getByPlaceholderText('Informe sua senha');
        const submitButton = getByTestId('submit-button');

        // Fill inputs
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect an error toast has been created
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith({
                title: 'Falha ao entrar na conta.',
                description: 'Tente novamente.'
            })
        });
    });
});