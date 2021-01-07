import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';

import Routes from './routes';

import ContextProvider from './hooks';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </div>
  );
}

export default App;
