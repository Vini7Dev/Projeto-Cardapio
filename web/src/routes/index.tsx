/**
 * Routes Controller
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages - No authenticated
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logon from '../pages/Logon';

// Pages - Authenticated
import Menu from '../pages/Menu';

const Routes: React.FC = () => {
    return (
      <Switch>
        {/** No authenticated routes */}
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logon" component={Logon} exact />

        {/** Authenticated routes */}
        <Route path="/menu" component={Menu} exact />
      </Switch>
    );
}

export default Routes;