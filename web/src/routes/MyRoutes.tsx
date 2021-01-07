/**
 * Custom Route Component
 */

import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface IMyRoutesProps extends RouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const MyRoutes: React.FC<IMyRoutesProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    // Use authentication data and functions
    const auth = useAuth();

    return (
      <Route
        render={({ location }) => {
            // Check if the route is private and the restaurant is authenticated
            return isPrivate === !!auth.restaurant
                ? <Component /> // Return the component
                : (
                  // Redirect to correct page (home to un authenticated / menu to authenticated)
                  <Redirect to={{
                    pathname: isPrivate ? '/' : '/menu',
                    state: { from: location }
                }}
                  />
        )}}
        {...rest}
      />
    );
}

export default MyRoutes;