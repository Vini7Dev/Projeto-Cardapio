/**
 * Context: Load screen
 */

import React, { createContext, useCallback, useContext, useState } from 'react';

// Component styles
import { LoadScreen } from './styles/loadStyles';

interface IProviderValue {
    setLoad(loading: boolean): void;
    isLoading: boolean;
}

const LoadContext = createContext<IProviderValue>({} as IProviderValue);

// Give access for load functions
export const useLoad = (): IProviderValue => {
    const context = useContext<IProviderValue>(LoadContext);

    return context;
};

const LoadProvider: React.FC = ({ children }) => {
    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Define loading
    const setLoad = useCallback((loading: boolean) => {
        setIsLoading(loading);
    }, []);

    return (
      <LoadContext.Provider value={{ setLoad, isLoading }}>
        <LoadScreen>
          {children}
          {
              isLoading && (
                <div id="load-screen">
                  <span>Carregando...</span>
                </div>
              )
          }
        </LoadScreen>
      </LoadContext.Provider>
    )
}

export default LoadProvider;