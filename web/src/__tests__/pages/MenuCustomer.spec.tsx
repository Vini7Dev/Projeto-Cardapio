/**
 * Test: Menu Customer
 */

import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, act, fireEvent } from '@testing-library/react';

import api from '../../services/api';

import MenuCustomer from '../../pages/MenuCustomer';

const apiMock = new MockAdapter(api);
const mockedHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            goBack: mockedHistoryGoBack,
        }),
        useParams: () => ({
            menu_code: '186a0',
        }),
    };
});

describe('Page: Menu Customer', () => {
    beforeEach(() => {
        apiMock.onGet('/menus/0').reply(200, {
            restaurantOwner: {
                id: '1',
                trade: '',
                cnpj: '',
                telephone: '99912345678',
                email: '',
                logo: '',
                logo_url: '',
                menu: {
                    id: '',
                    code: 0,
                },
            },
            menu: [
                {
                    item: {
                        id: '1',
                        category: {
                            category_name: 'CategoryA',
                        }
                    }
                },
                {
                    item: {
                        id: '2',
                        category: {
                            category_name: 'CategoryB',
                        }
                    }
                },
            ]
        });
    });

    it('should be able to render page', async () => {
        act(async () => {
            // Render page
            const { getByTestId } = render(<MenuCustomer />);

            // Select one page element
            const element = getByTestId('telephone-display');

            // Check if element exists
            await waitFor(() => {
                expect(element).toBeTruthy();
            });
        });
    });

    it('should be able to go back', async () => {
        // Render page
        const { getAllByTestId } = render(<MenuCustomer />);

        // Getting option buttons
        const optionButtons = getAllByTestId('option-button');

        // Click in button
        fireEvent.click(optionButtons[0]);

        // Check if element exists
        await waitFor(() => {
            expect(mockedHistoryGoBack).toBeTruthy();
        });
    });
});