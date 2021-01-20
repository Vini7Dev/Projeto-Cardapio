/**
 * Test: SignUp
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../services/api', () => {
    return {
        post: jest.fn(),
    }
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

describe('Page: SignUp', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to create a new restaurant account without logo', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignUp />);

        // Gettinf form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const cnpjInput = getByPlaceholderText('CNPJ');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const passwordConfirmationInput = getByPlaceholderText('Confirme a senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'Example' } });
        fireEvent.change(cnpjInput, { target: { value: '11111111111111' } });
        fireEvent.change(telephoneInput, { target: { value: '99999999999' } });
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(passwordConfirmationInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenLastCalledWith('/signin');
        });
    });

    it('should be able to create a new restaurant account with logo', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignUp />);

        // Gettinf form inputs and submit button
        const addLogoInput = getByTestId('add-logo');
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const cnpjInput = getByPlaceholderText('CNPJ');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const passwordConfirmationInput = getByPlaceholderText('Confirme a senha');
        const submitButton = getByTestId('submit-button');

        // Creating example logo file
        const file = new File(['test'], 'test');

        // Fill form inputs
        fireEvent.change(addLogoInput, { target: { files: [ file ] } });
        fireEvent.change(tradeInput, { target: { value: 'Example' } });
        fireEvent.change(cnpjInput, { target: { value: '11111111111111' } });
        fireEvent.change(telephoneInput, { target: { value: '99999999999' } });
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(passwordConfirmationInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenLastCalledWith('/signin');
        });
    });



    it('should not be able to create a new restaurant account with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignUp />);

        // Gettinf form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const cnpjInput = getByPlaceholderText('CNPJ');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const passwordConfirmationInput = getByPlaceholderText('Confirme a senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'Example' } });
        fireEvent.change(cnpjInput, { target: { value: 'invalid-cnpj' } });
        fireEvent.change(telephoneInput, { target: { value: 'invalid-telephone' } });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: '1' } });
        fireEvent.change(passwordConfirmationInput, { target: { value: '2' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenLastCalledWith('/signin');
        });
    });

    it('should be able to display a notification error when registration fails', async () => {
        // Create error
        mockedAddToast.mockImplementationOnce(() => {
            throw new Error('Registration error example');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<SignUp />);

        // Gettinf form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const cnpjInput = getByPlaceholderText('CNPJ');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Senha');
        const passwordConfirmationInput = getByPlaceholderText('Confirme a senha');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'Example' } });
        fireEvent.change(cnpjInput, { target: { value: '11111111111111' } });
        fireEvent.change(telephoneInput, { target: { value: '99999999999' } });
        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(passwordConfirmationInput, { target: { value: '123456' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenLastCalledWith({
                     title: 'Falha ao criar a conta.',
                     description: 'Reveja as credenciais e tente novamente.',
            });
        });
    });
});