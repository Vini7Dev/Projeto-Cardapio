/**
 * Routes Controller
 */

import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoutes from './MyRoutes';

// Pages - No authenticated
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Pages - Authenticated
import MenuAdmin from '../pages/MenuAdmin';
import EditProfile from '../pages/EditProfile';
import CreateFood from '../pages/CreateFood';

const Routes: React.FC = () => {
    return (
      <Switch>
        {/** No authenticated routes */}
        <MyRoutes path="/" component={Home} exact />
        <MyRoutes path="/signin" component={SignIn} exact />
        <MyRoutes path="/signup" component={SignUp} exact />
        <MyRoutes path="/forgot-password" component={ForgotPassword} exact />
        <MyRoutes path="/reset-password/:token" component={ResetPassword} exact />

        {/** Authenticated routes */}
        <MyRoutes path="/menu" component={MenuAdmin} exact isPrivate />
        <MyRoutes path="/profile" component={EditProfile} exact isPrivate />
        <MyRoutes path="/create-food" component={CreateFood} isPrivate />
      </Switch>
    );
}

export default Routes;