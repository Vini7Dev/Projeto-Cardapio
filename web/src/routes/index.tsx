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
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Pages - Authenticated
import Menu from '../pages/Menu';

const Routes: React.FC = () => {
    return (
      <Switch>
        {/** No authenticated routes */}
        <MyRoutes path="/" component={Home} exact />
        <MyRoutes path="/login" component={Login} exact />
        <MyRoutes path="/logon" component={Logon} exact />
        <MyRoutes path="/forgot-password" component={ForgotPassword} exact />
        <MyRoutes path="/reset-password" component={ResetPassword} exact />

        {/** Authenticated routes */}
        <MyRoutes path="/menu" component={Menu} exact isPrivate />
      </Switch>
    );
}

export default Routes;