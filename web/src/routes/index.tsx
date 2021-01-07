/**
 * Routes Controller
 */

import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoutes from './MyRoutes';

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
        <MyRoutes path="/" component={Home} exact />
        <MyRoutes path="/login" component={Login} exact />
        <MyRoutes path="/logon" component={Logon} exact />

        {/** Authenticated routes */}
        <MyRoutes path="/menu" component={Menu} exact isPrivate />
      </Switch>
    );
}

export default Routes;