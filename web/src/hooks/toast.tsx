/**
 * Context: Toast
 */

import React, { useState, createContext, useCallback, useContext } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface IToastData {
    id: string;
    title: string;
    description?: string;
    status?: 'success' | 'error';
}

interface IProviderValue {
    toasts: IToastData[],
    addToast(toastData: Omit<IToastData, 'id'>): void;
    removeToast(id: string): void;
}

// Creating toast context
const ToastContext = createContext<IProviderValue>({} as IProviderValue);

// Give access for toast functions
export const useToast = (): IProviderValue => {
    const toastContext = useContext(ToastContext);

    if(!toastContext) {
        throw new Error('useToast necessita do ToastProvider para funcionar.');
    }

    return toastContext;
}

const ToastProvider: React.FC = ({ children }) => {
    // All active toasts
    const [toasts, setToasts] = useState<IToastData[]>([]);

    // Add a new toast
    const addToast = useCallback(({
        title,
        description = '',
        status = 'error'
    }: Omit<IToastData, 'id'>) => {
        // Generate id for toast
        const id = uuid();

        // Creating toast data
        const toastData = {
            id,
            title,
            description,
            status,
        }

        // Saving new toast in list
        setToasts(previousToast => [...previousToast, toastData]);
    }, [setToasts]);

    // Remove toast from list
    const removeToast = useCallback((id: string) => {
        setToasts(previousToast => previousToast.filter(toast => toast.id !== id));
    }, [setToasts]);

    return (
      <ToastContext.Provider value={{
          addToast,
          removeToast,
          toasts }}
      >
        {children}
        <ToastContainer toasts={toasts} />
      </ToastContext.Provider>
    );
}

export default ToastProvider;