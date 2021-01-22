/**
 * Test: auth
 */

import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import AuthProvider, { useAuth } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

describe('Hooks: auth', () => {
    beforeEach(() => {
        apiMock.onPost('/section').reply(200, {
            restaurant: { email: 'example@mail.com' },
            token: 'Bearer Token-Example',
        });
    });

    it('should be able to login', async () => {
        // Spy local storage
        const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

        // Render hook
        const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        // Execute login
        result.current.login({
            email: 'example@mail.com',
            password: 'pass123',
        });

        // Await login
        await waitForNextUpdate();

        // Expect save token on storage
        expect(localStorageSpy).toHaveBeenCalledWith('@Menue:token', 'Bearer Token-Example');
        expect(result.current.restaurant.email).toEqual('example@mail.com');
    });

    it('should be able to update restaurant data', async () => {
        // Spy local storage
        const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

        // Render hook
        const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        // Updated restaurant data
        const updateRestaurantData = {
            id: '0',
            trade: 'Updated Trade',
            cnpj: 'Updated CNPJ',
            telephone: 'Updated Telephone',
            logo: '',
            logo_url: '',
            menu: { id: '0', code: 0 },
            email: 'updated@mail.com',
        };

        // Update restaurant data
        act(() => {
            result.current.updateRestaurant(updateRestaurantData);
        });

        // Expect update restaurant data
        expect(localStorageSpy).toHaveBeenCalledWith('@Menue:restaurant', JSON.stringify(updateRestaurantData));
        expect(result.current.restaurant.email).toEqual('updated@mail.com');
    });

    it('should be able to logout', () => {
        // Spy local storage
        const localStoragSpy = jest.spyOn(Storage.prototype, 'removeItem');

        // Render Hook
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        // Execute logout
        act(() => {
            result.current.logout();
        });

        // Expect clear local storage
        expect(localStoragSpy).toHaveBeenCalledWith('@Menue:token');
        expect(localStoragSpy).toHaveBeenCalledWith('@Menue:restaurant');
    });
});