/**
 * Context controller
 */

import React from 'react';

import ToastProvider from './toast';
import AuthProvider from './auth';
import LoadProvider from './load';

const ContextProvider: React.FC = ({ children }) => {
    return (
      <AuthProvider>
        <ToastProvider>
          <LoadProvider>
            {children}
          </LoadProvider>
        </ToastProvider>
      </AuthProvider>
    )
}

export default ContextProvider;
