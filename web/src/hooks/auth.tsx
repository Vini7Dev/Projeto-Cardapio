/**
 * Context: Auth
 */

import React, { createContext, useContext, useCallback, useState } from 'react';

import api from '../services/api';

interface IRestaurantData {
    id: string;
    trade: string;
    cnpj: string;
    telephone: string;
    email: string;
    logo: string;
    logo_url: string;
    menu: {
        id: string;
        code: number;
    };
}

interface ILoginData {
    email: string;
    password: string;
}

interface IAuthData {
    token: string;
    restaurant: IRestaurantData;
}

interface IProviderValue {
    restaurant: IRestaurantData,
    login(loginData: ILoginData): Promise<void> ;
    logout(): void;
    updateRestaurant(restaurant: IRestaurantData): void;
}

// Creating authentication context
const AuthContext = createContext<IProviderValue>({} as IProviderValue);

// Give access for authentication data and functions
export const useAuth = (): IProviderValue => {
    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('useAuth nececita do AuthProvider para funcionar.');
    }

    return authContext;
}

// Context provider
const AuthProvider: React.FC = ({ children }) => {
    // Authentication data state
    const [ authData, setAuthData ] = useState<IAuthData>(() => {
        // Getting authentication from localstorage
        const token = localStorage.getItem('@Menue:token');
        const restaurant = localStorage.getItem('@Menue:restaurant');

        // Check if is authenticated
        if(token && restaurant) {
            // Saving restaurant's token
            api.defaults.headers.authorization = `Bearer ${token}`;

            // Returning authentication
            return { token, restaurant: JSON.parse(restaurant) };
        }

        // If else, return a empty object
        return {} as IAuthData;
    });

    // Login
    const login = useCallback(async ({ email, password }: ILoginData) => {
        // Create a new section
        const response = await api.post('/section', { email, password });

        // Getting section data
        const { token, restaurant } = response.data;

        // Saving section data
        localStorage.setItem('@Menue:token', token);
        localStorage.setItem('@Menue:restaurant', JSON.stringify(restaurant));

        // Saving restaurant's token
        api.defaults.headers.authorization = `Bearer ${token}`;

        // Saving authentication data in context
        setAuthData({
            token,
            restaurant
        });
    }, [setAuthData]);

    // Update restaurant data
    const updateRestaurant = useCallback((restaurant: IRestaurantData) => {
        // Saving updated restaurant in local storage
        localStorage.setItem('@Menue:restaurant', JSON.stringify(restaurant));

        // Saving updates data in auth data
        setAuthData({
            token: authData.token,
            restaurant
        });
    }, [authData, setAuthData]);

    // Logout
    const logout = useCallback(() => {
        // Removing authentication data from local storage
        localStorage.removeItem('@Menue:token');
        localStorage.removeItem('@Menue:restaurant');

        // Set authentication data for an empty object
        setAuthData({} as IAuthData)
    }, []);

    return (
      <AuthContext.Provider value={{
          restaurant: authData.restaurant,
          login,
          logout,
          updateRestaurant }}
      >
        {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;