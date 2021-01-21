/**
 * Test: Menu Admin
 */

import React from 'react';
import { render } from '@testing-library/react';

import MenuAdmin from '../../pages/MenuAdmin';

const mockedApiGet = jest.fn();

jest.mock('../../services/api', () => {
    return {
        get: () => mockedApiGet(),
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: jest.fn(),
        }),
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            logout: jest.fn(),
            restaurant: {
                menu: { code: 0 },
                trade: '',
                logo: '',
                logo_url: '',
                cnpj: '',
                telephone: '',
            },
        }),
    };
});

describe('Page: Menu Admin', () => {
    beforeEach(() => {
        mockedApiGet.mockReturnValue({
            data: {
                menu: [{
                    item: { category: { category_name: 'Category' } },
                }]
            }
        });
    });

    it('should be able to list menu items', () => {
        // Render page
        render(<MenuAdmin />);
    })
});