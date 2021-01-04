/**
 * Routes Controller
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logon from '../pages/Logon';

const Routes: React.FC = () => {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logon" component={Logon} exact />
      </Switch>
    );
}

export default Routes;